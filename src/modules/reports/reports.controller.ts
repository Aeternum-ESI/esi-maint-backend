import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtPayload } from '../auth/dtos/jwtPayload';
import { User } from '../auth/decorators/user.decorator';
import { CreateReportDto } from './dtos/createReport.dto';
import { OperationType } from '@prisma/client';
import { CreateScheduleDto } from './dtos/createSchedule.dto';
import { UpdateScheduleDto } from './dtos/updateSchedule.dto';

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
    if (!createReportDto.assetId) {
      throw new BadRequestException('Asset ID is required');
    }

    if (createReportDto.categoryId) {
      throw new BadRequestException(
        'Category ID does not have to be provided in corrective reports',
      );
    }
    return this.reportsService.createReport(
      User.id,
      createReportDto,
      OperationType.CORRECTIVE,
    );
  }

  @Get('schedules')
  async findAllScheduledReports() {
    return this.reportsService.findAllScheduled();
  }

  @Post('schedules')
  async createScheduledReport(
    @User() User: JwtPayload,
    @Body() createScheduleDto: CreateScheduleDto,
  ) {
    // Either assetId or categoryId must be provided and only one of them
    if (!createScheduleDto.assetId && !createScheduleDto.categoryId) {
      throw new BadRequestException(
        'Either assetId or categoryId must be provided',
      );
    }
    if (createScheduleDto.assetId && createScheduleDto.categoryId) {
      throw new BadRequestException(
        'Only one of assetId or categoryId must be provided',
      );
    }

    return this.reportsService.schedule(User.id, createScheduleDto);
  }

  @Put('schedules/:id')
  updateSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.reportsService.updateSchedule(id, updateScheduleDto);
  }

  @Delete('schedules/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.deleteSchedule(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.findReportById(id);
  }
}
