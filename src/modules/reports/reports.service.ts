import { OperationType } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/createReport.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}
  createReport(
    reporterId: number,
    createReportDto: CreateReportDto,
    operationType: OperationType,
  ) {
    return this.prismaService.report.create({
      data: {
        ...createReportDto,
        reporterId,
        type: operationType,
        status: 'PENDING',
      },
    });
  }

  findReportById(id: number) {
    throw new Error('Method not implemented.');
  }

  findAllReports() {
    throw new Error('Method not implemented.');
  }
}
