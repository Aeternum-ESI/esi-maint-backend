import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtPayload } from '../auth/dtos/jwtPayload';
import { User } from '../auth/decorators/user.decorator';
import { CreateReportDto } from './dtos/createReport.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async findAll() {
    return this.reportsService.findAllReports();
  }

  @Post()
  async createReport(
    @User() User: JwtPayload,
    @Body() createReportDto: CreateReportDto,
  ) {
    // return this.reportsService.createReport();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.findReportById(id);
  }
}
