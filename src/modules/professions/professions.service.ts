import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { PrismaService } from 'nestjs-prisma';

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

  findOne(id: number) {
    const category = this.prismaService.profession.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Profession with id ${id} does not exist`);
    }
    return category;
  }

  update(id: number, updateProfessionDto: UpdateProfessionDto) {
    this.findOne(id);
    return this.prismaService.profession.update({
      where: { id },
      data: updateProfessionDto,
    });
  }

  remove(id: number) {
    this.findOne(id);
    return this.prismaService.profession.delete({
      where: { id },
    });
  }
}
