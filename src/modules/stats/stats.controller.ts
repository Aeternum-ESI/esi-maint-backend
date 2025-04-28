import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { TimeRangeDto } from './dto/time-range.dto';

@ApiTags('Statistics')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get overview statistics' })
  async getOverviewStatistics() {
    return this.statsService.getOverviewStatistics();
  }

  // ASSET STATISTICS
  @Get('assets/by-status')
  @ApiOperation({ summary: 'Get asset count by status' })
  async getAssetsByStatus() {
    return this.statsService.getAssetsByStatus();
  }

  @Get('assets/by-type')
  @ApiOperation({ summary: 'Get asset count by type' })
  async getAssetsByType() {
    return this.statsService.getAssetsByType();
  }

  @Get('assets/by-category')
  @ApiOperation({ summary: 'Get asset count by category' })
  async getAssetsByCategory() {
    return this.statsService.getAssetsByCategory();
  }

  @Get('assets/top-problem-assets')
  @ApiOperation({ summary: 'Get top assets with most reports' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopProblemAssets(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.statsService.getTopProblemAssets(limit);
  }

  // REPORT STATISTICS
  @Get('reports/by-status')
  @ApiOperation({ summary: 'Get report count by status' })
  async getReportsByStatus(@Query() timeRange?: TimeRangeDto) {
    return this.statsService.getReportsByStatus(timeRange);
  }

  @Get('reports/by-priority')
  @ApiOperation({ summary: 'Get report count by priority' })
  async getReportsByPriority(@Query() timeRange?: TimeRangeDto) {
    return this.statsService.getReportsByPriority(timeRange);
  }

  @Get('reports/by-type')
  @ApiOperation({ summary: 'Get report count by type' })
  async getReportsByType(@Query() timeRange?: TimeRangeDto) {
    return this.statsService.getReportsByType(timeRange);
  }

  @Get('reports/over-time')
  @ApiOperation({ summary: 'Get report count over time' })
  @ApiQuery({
    name: 'period',
    required: false,
    enum: ['daily', 'weekly', 'monthly'],
  })
  @ApiQuery({ name: 'days', required: false, type: Number })
  async getReportsOverTime(
    @Query('period', new DefaultValuePipe('daily'))
    period: 'daily' | 'weekly' | 'monthly',
    @Query('days', new DefaultValuePipe(30), ParseIntPipe) days: number,
  ) {
    return this.statsService.getReportsOverTime(period, days);
  }

  @Get('reports/avg-resolution-time')
  @ApiOperation({ summary: 'Get average resolution time for reports in hours' })
  async getAverageResolutionTime() {
    return this.statsService.getAverageResolutionTime();
  }

  // TECHNICIAN STATISTICS
  @Get('technicians/stats')
  @ApiOperation({ summary: 'Get statistics for all technicians' })
  async getTechnicianStats() {
    return this.statsService.getTechnicianStats();
  }

  @Get('technicians/top')
  @ApiOperation({ summary: 'Get top technicians by completed interventions' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopTechnicians(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.statsService.getTopTechnicians(limit);
  }

  // CATEGORY STATISTICS
  @Get('categories/top')
  @ApiOperation({ summary: 'Get top categories with most reports' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopCategories(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.statsService.getTopCategories(limit);
  }
}
