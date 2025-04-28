import { Injectable } from '@nestjs/common';
import { TimeRangeDto } from './dto/time-range.dto';
import {
  CountByStatusDto,
  CountByTypeDto,
  CountByPriorityDto,
  CountByCategoryDto,
  TimeSeriesDataPoint,
  TechnicianStatsDto,
  TopItemDto,
  OverviewStatsDto,
} from './dto/stats-response.dto';
import {
  AssetStatus,
  AssetType,
  Priority,
  ReportStatus,
  OperationType,
} from 'prisma/generated/client';
import { sub, format, parseISO, differenceInHours } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prismaService: PrismaService) {}

  async getOverviewStatistics(): Promise<OverviewStatsDto> {
    const [
      totalAssets,
      totalReports,
      totalInterventions,
      pendingReports,
      resolvedReports,
    ] = await Promise.all([
      this.prismaService.asset.count(),
      this.prismaService.report.count(),
      this.prismaService.interventions.count(),
      this.prismaService.report.count({
        where: {
          status: { in: [ReportStatus.PENDING, ReportStatus.ASSIGNED] },
        },
      }),
      this.prismaService.report.count({
        where: { status: ReportStatus.TREATED },
      }),
    ]);

    const resolutionRate =
      totalReports > 0
        ? Number(((resolvedReports / totalReports) * 100).toFixed(2))
        : 0;

    return {
      totalAssets,
      totalReports,
      totalInterventions,
      pendingReports,
      resolvedReports,
      resolutionRate,
    };
  }

  // ASSET STATISTICS
  async getAssetsByStatus(): Promise<CountByStatusDto[]> {
    const result = await this.prismaService.asset.groupBy({
      by: ['status'],
      _count: true,
    });

    return result.map((item) => ({
      status: item.status,
      count: item._count,
    }));
  }

  async getAssetsByType(): Promise<CountByTypeDto[]> {
    const result = await this.prismaService.asset.groupBy({
      by: ['type'],
      _count: true,
    });

    return result.map((item) => ({
      type: item.type,
      count: item._count,
    }));
  }

  async getAssetsByCategory(): Promise<CountByCategoryDto[]> {
    const assets = await this.prismaService.asset.findMany({
      include: {
        category: true,
      },
    });

    const categoryMap = new Map<string, number>();

    assets.forEach((asset) => {
      if (asset.category) {
        const categoryName = asset.category.name;
        categoryMap.set(categoryName, (categoryMap.get(categoryName) || 0) + 1);
      }
    });

    return Array.from(categoryMap.entries()).map(([categoryName, count]) => ({
      categoryName,
      count,
    }));
  }

  async getTopProblemAssets(limit: number = 5): Promise<TopItemDto[]> {
    const assets = await this.prismaService.asset.findMany({
      include: {
        reports: true,
      },
    });

    const assetProblems = assets
      .map((asset) => ({
        id: asset.id,
        name: asset.name,
        count: asset.reports.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return assetProblems;
  }

  async getAllAssetStatistics(limit: number = 5) {
    // Fetch all asset statistics in parallel for better performance
    const [assetsByStatus, assetsByType, assetsByCategory, topProblemAssets] =
      await Promise.all([
        this.getAssetsByStatus(),
        this.getAssetsByType(),
        this.getAssetsByCategory(),
        this.getTopProblemAssets(limit),
      ]);

    // Return consolidated results
    return {
      assetsByStatus,
      assetsByType,
      assetsByCategory,
      topProblemAssets,
    };
  }

  // REPORT STATISTICS
  async getReportsByStatus(
    timeRange?: TimeRangeDto,
  ): Promise<CountByStatusDto[]> {
    const dateFilter = this.buildDateFilter(timeRange, 'createdAt');

    const result = await this.prismaService.report.groupBy({
      by: ['status'],
      _count: true,
      where: dateFilter,
    });

    return Object.values(ReportStatus).map((status) => {
      const found = result.find((item) => item.status === status);
      return {
        status,
        count: found ? found._count : 0,
      };
    });
  }

  async getReportsByPriority(
    timeRange?: TimeRangeDto,
  ): Promise<CountByPriorityDto[]> {
    const dateFilter = this.buildDateFilter(timeRange, 'createdAt');

    const result = await this.prismaService.report.groupBy({
      by: ['priority'],
      _count: true,
      where: dateFilter,
    });

    return Object.values(Priority).map((priority) => {
      const found = result.find((item) => item.priority === priority);
      return {
        priority,
        count: found ? found._count : 0,
      };
    });
  }

  async getReportsByType(timeRange?: TimeRangeDto): Promise<CountByTypeDto[]> {
    const dateFilter = this.buildDateFilter(timeRange, 'createdAt');

    const result = await this.prismaService.report.groupBy({
      by: ['type'],
      _count: true,
      where: dateFilter,
    });

    return Object.values(OperationType).map((type) => {
      const found = result.find((item) => item.type === type);
      return {
        type,
        count: found ? found._count : 0,
      };
    });
  }

  async getReportsOverTime(
    period: 'daily' | 'weekly' | 'monthly' = 'daily',
    days: number = 30,
  ): Promise<TimeSeriesDataPoint[]> {
    const startDate = sub(new Date(), { days });

    const reports = await this.prismaService.report.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const dateFormat =
      period === 'daily'
        ? 'yyyy-MM-dd'
        : period === 'weekly'
        ? "'yyyy-'w'W'"
        : 'yyyy-MM';

    const timeSeriesMap = new Map<string, number>();

    // Initialize all dates in the range
    let currentDate = startDate;
    const now = new Date();
    while (currentDate <= now) {
      const formattedDate = format(currentDate, dateFormat);
      timeSeriesMap.set(formattedDate, 0);

      if (period === 'daily') {
        currentDate = sub(currentDate, { days: -1 });
      } else if (period === 'weekly') {
        currentDate = sub(currentDate, { weeks: -1 });
      } else {
        currentDate = sub(currentDate, { months: -1 });
      }
    }

    // Count reports by period
    reports.forEach((report) => {
      const dateKey = format(report.createdAt, dateFormat);
      timeSeriesMap.set(dateKey, (timeSeriesMap.get(dateKey) || 0) + 1);
    });

    return Array.from(timeSeriesMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async getAverageResolutionTime(): Promise<number> {
    const treatedReports = await this.prismaService.report.findMany({
      where: { status: ReportStatus.TREATED },
      include: {
        interventionRequests: {
          include: {
            Interventions: true,
          },
        },
      },
    });

    if (treatedReports.length === 0) return 0;

    let totalHours = 0;
    let countWithInterventions = 0;

    treatedReports.forEach((report) => {
      if (
        report.interventionRequests &&
        report.interventionRequests.length > 0
      ) {
        report.interventionRequests.forEach((req) => {
          if (req.Interventions && req.Interventions.length > 0) {
            // Calculate difference between report creation and first intervention
            const firstIntervention = req.Interventions.reduce(
              (earliest, current) =>
                earliest.createdAt < current.createdAt ? earliest : current,
            );

            const hours = differenceInHours(
              new Date(firstIntervention.createdAt),
              new Date(report.createdAt),
            );

            totalHours += hours;
            countWithInterventions++;
          }
        });
      }
    });

    return countWithInterventions > 0
      ? Number((totalHours / countWithInterventions).toFixed(2))
      : 0;
  }

  // TECHNICIAN STATISTICS
  async getTechnicianStats(): Promise<TechnicianStatsDto[]> {
    const technicians = await this.prismaService.technician.findMany({
      include: {
        user: true,
        TechnicianAssignements: true,
      },
    });

    // Process technicians one by one to handle async operations properly
    const technicianStats: TechnicianStatsDto[] = [];
    for (const tech of technicians) {
      const completed = tech.TechnicianAssignements.filter(
        (assignment) => assignment.completed,
      ).length;

      const pending = tech.TechnicianAssignements.filter(
        (assignment) => !assignment.completed,
      ).length;

      // Get completed assignments
      const completedAssignments = tech.TechnicianAssignements.filter(
        (assignment) => assignment.completed,
      );

      // Calculate average completion time where possible
      let totalCompletionTime = 0;
      let countWithCompletionTime = 0;

      // Create array of promises for intervention queries
      const interventionPromises = completedAssignments.map(
        async (assignment) => {
          const interventions = await this.prismaService.interventions.findMany(
            {
              where: {
                interventionRequestId: assignment.interventionRequestId,
                technicianId: tech.userId,
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
          );

          if (interventions.length > 0) {
            const firstIntervention = interventions[0];
            const hours = differenceInHours(
              new Date(firstIntervention.createdAt),
              new Date(assignment.createdAt),
            );

            return hours;
          }
          return null;
        },
      );

      // Wait for all intervention queries to complete
      const completionTimes = await Promise.all(interventionPromises);

      // Calculate totals from valid completion times
      completionTimes.forEach((hours) => {
        if (hours !== null) {
          totalCompletionTime += hours;
          countWithCompletionTime++;
        }
      });

      const averageCompletionTimeHours =
        countWithCompletionTime > 0
          ? Number((totalCompletionTime / countWithCompletionTime).toFixed(2))
          : undefined;

      technicianStats.push({
        id: tech.userId,
        name: tech.user?.name || 'Unknown', // Add null check with fallback
        completedInterventions: completed,
        pendingInterventions: pending,
        averageCompletionTimeHours: averageCompletionTimeHours || 0, // Ensure it's always a number
      });
    }

    return technicianStats;
  }

  async getTopTechnicians(limit: number = 5): Promise<TopItemDto[]> {
    const technicians = await this.prismaService.technician.findMany({
      include: {
        user: true,
        TechnicianAssignements: {
          where: {
            completed: true,
          },
        },
      },
    });

    const rankedTechnicians = technicians
      .map((tech) => ({
        id: tech.userId,
        name: tech.user.name,
        count: tech.TechnicianAssignements.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return rankedTechnicians;
  }

  async getTopCategories(limit: number = 5): Promise<TopItemDto[]> {
    const categories = await this.prismaService.category.findMany({
      include: {
        Report: true,
      },
    });

    const rankedCategories = categories
      .map((category) => ({
        id: category.id,
        name: category.name,
        count: category.Report.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return rankedCategories;
  }

  // HELPER FUNCTIONS
  private buildDateFilter(
    timeRange?: TimeRangeDto,
    dateField: string = 'createdAt',
  ): any {
    if (!timeRange) return {};

    const filter: any = {};

    if (timeRange.startDate) {
      filter[dateField] = {
        ...(filter[dateField] || {}),
        gte: new Date(timeRange.startDate),
      };
    }

    if (timeRange.endDate) {
      filter[dateField] = {
        ...(filter[dateField] || {}),
        lte: new Date(timeRange.endDate),
      };
    }

    return filter;
  }
}
