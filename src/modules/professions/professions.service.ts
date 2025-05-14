import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from 'prisma/generated/client';
import { Roles } from '../auth/decorators/roles.decorator';

@Roles(Role.ADMIN)
@Injectable()
export class ProfessionsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createProfessionDto: CreateProfessionDto) {
    return this.prismaService.profession.create({
      data: createProfessionDto,
    });
  }

  findAll() {
    return this.prismaService.profession.findMany();
  }

  async findOne(id: number) {
    const category = await this.prismaService.profession.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Profession with id ${id} does not exist`);
    }
    return category;
  }

  async update(id: number, updateProfessionDto: UpdateProfessionDto) {
    await this.findOne(id);
    return this.prismaService.profession.update({
      where: { id },
      data: updateProfessionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.profession.delete({
      where: { id },
    });
  }
}
