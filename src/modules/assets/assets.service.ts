import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PrismaService } from 'nestjs-prisma';
import { AssetStatus, AssetType } from '@prisma/client';

@Injectable()
export class AssetsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetDto: CreateAssetDto) {
    // Validate location relationship based on asset type
    if (createAssetDto.locationId) {
      await this.validateLocationRelationship(
        createAssetDto.type,
        createAssetDto.locationId,
      );
    }

    return this.prismaService.asset.create({
      data: {
        ...createAssetDto,
        status: AssetStatus.OPERATIONAL,
      },
    });
  }

  findAll() {
    return this.prismaService.asset.findMany({
      include: {
        category: true,
        location: true,
      },
    });
  }

  async findOne(id: number) {
    const asset = await this.prismaService.asset.findUnique({
      where: { id },
      include: {
        category: true,
        location: true,
      },
    });
    if (!asset) {
      throw new NotFoundException(`Asset with id ${id} does not exist`);
    }
    return asset;
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    const existingAsset = await this.findOne(id);

    // If type is being changed or location is being updated, validate the relationship
    if (
      (updateAssetDto.type && updateAssetDto.type !== existingAsset.type) ||
      (updateAssetDto.locationId &&
        updateAssetDto.locationId !== existingAsset.locationId)
    ) {
      // Determine the type to check against (new type or existing type)
      const typeToCheck = updateAssetDto.type || existingAsset.type;
      // Determine the location to check against (new location or existing location)
      const locationToCheck =
        updateAssetDto.locationId ?? existingAsset.locationId;

      await this.validateLocationRelationship(typeToCheck, locationToCheck);

      // If type is changing, validate that it doesn't break children relationships
      if (updateAssetDto.type && updateAssetDto.type !== existingAsset.type) {
        await this.validateChildrenRelationships(id, updateAssetDto.type);
      }
    }

    return this.prismaService.asset.update({
      where: { id },
      data: updateAssetDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.asset.delete({
      where: { id },
    });
  }

  // Helper method to validate location relationship
  private async validateLocationRelationship(
    assetType: AssetType,
    locationId: number | null,
  ): Promise<void> {
    if (!locationId) {
      return;
    }
    // Get the parent location type
    const parentLocation = await this.prismaService.asset.findUnique({
      where: { id: locationId },
      select: { type: true },
    });

    if (!parentLocation) {
      throw new NotFoundException(
        `Parent location with id ${locationId} does not exist`,
      );
    }

    // Validate based on asset type
    switch (assetType) {
      case AssetType.EQUIPMENT:
        if (
          parentLocation.type !== AssetType.BUILDING &&
          parentLocation.type !== AssetType.ROOM
        ) {
          throw new BadRequestException(
            `Equipment must be located in either a building or a room`,
          );
        }
        break;
      case AssetType.ROOM:
        if (parentLocation.type !== AssetType.BUILDING) {
          throw new BadRequestException(`Rooms must be located in a building`);
        }
        break;
      case AssetType.BUILDING:
        throw new BadRequestException(`Buildings cannot have a location`);
      default:
        throw new BadRequestException(`Invalid asset type: ${assetType}`);
    }
  }

  // Helper method to validate that changing an asset type doesn't break existing child relationships
  private async validateChildrenRelationships(
    assetId: number,
    newType: string,
  ): Promise<void> {
    // Find assets that use this asset as their location
    const childAssets = await this.prismaService.asset.findMany({
      where: { locationId: assetId },
      select: { id: true, type: true },
    });

    for (const child of childAssets) {
      // Check if the new type is valid for existing children
      if (child.type === AssetType.ROOM && newType !== AssetType.BUILDING) {
        throw new BadRequestException(
          `Cannot change type to ${newType} because it has rooms as children, which must be in a building`,
        );
      }

      if (
        child.type === AssetType.EQUIPMENT &&
        newType !== AssetType.BUILDING &&
        newType !== AssetType.ROOM
      ) {
        throw new BadRequestException(
          `Cannot change type to ${newType} because it has equipment as children, which must be in a building or room`,
        );
      }
    }
  }
}
