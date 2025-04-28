import { ApiProperty } from '@nestjs/swagger';

export class CountByStatusDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  count: number;
}

export class CountByTypeDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  count: number;
}

export class CountByPriorityDto {
  @ApiProperty()
  priority: string;

  @ApiProperty()
  count: number;
}

export class CountByCategoryDto {
  @ApiProperty()
  categoryName: string;

  @ApiProperty()
  count: number;
}

export class TimeSeriesDataPoint {
  @ApiProperty()
  date: string;

  @ApiProperty()
  count: number;
}

export class TechnicianStatsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  completedInterventions: number;

  @ApiProperty()
  pendingInterventions: number;

  @ApiProperty()
  averageCompletionTimeHours?: number;
}

export class TopItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  count: number;
}

export class OverviewStatsDto {
  @ApiProperty()
  totalAssets: number;

  @ApiProperty()
  totalReports: number;

  @ApiProperty()
  totalInterventions: number;

  @ApiProperty()
  pendingReports: number;

  @ApiProperty()
  resolvedReports: number;

  @ApiProperty({ type: Number })
  resolutionRate: number;
}
