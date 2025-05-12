import { Injectable, Logger } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { PrismaService } from '../prisma/prisma.service';

import { assetsSeed } from './seeds/assets.seed';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { AuthService } from '../auth/auth.service';
import { ProfessionsService } from '../professions/professions.service';
import { ReportsService } from '../reports/reports.service';
import { InterventionRequestsService } from '../intervention-requests/intervention-requests.service';
import { TechniciansService } from '../users/technicians/technicians.service';
import { AssetType, Day, Priority, Role } from 'prisma/generated/client';
import { usersSeed } from './seeds/users.seed';
import { professionsSeed } from './seeds/professions.seed';
import { randomInt } from 'crypto';
import { categoriesSeed, categoriesSeedType } from './seeds/categories.seed';
import { reportsSeed } from './seeds/reports.seed';
import { scheduleSeed } from './seeds/schedule.seed';
import { interventionsSeed } from './seeds/interventions.seed';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly assetsService: AssetsService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly professionService: ProfessionsService,
    private readonly technicianService: TechniciansService, // Assuming you have a PrismaService for database operations
    private readonly categoriesService: CategoriesService,
    private readonly reportsService: ReportsService,
    private readonly interventionRequestsService: InterventionRequestsService, // private readonly notificationsService: NotificationsService, // private readonly statsService: StatsService, // private readonly tasksService: TasksService, // private readonly techniciansService: TechniciansService,
  ) {}

  async clearDatabase() {
    this.logger.log('Clearing database directly through Prisma...');
    // Delete data from all tables in reverse dependency order
    // Temporarily disable foreign key constraints for SQLite
    await this.prisma.$executeRaw`PRAGMA foreign_keys = OFF;`;

    // Get all model names from the Prisma client
    const modelNames = Object.keys(this.prisma).filter(
      (key) =>
        !key.startsWith('$') &&
        typeof this.prisma[key] === 'object' &&
        this.prisma[key] !== null &&
        typeof this.prisma[key].deleteMany === 'function',
    );

    this.logger.log(`Clearing tables: ${modelNames.join(', ')}`);

    // Delete from all tables in a transaction
    await this.prisma.$transaction(
      modelNames.map((modelName) => this.prisma[modelName].deleteMany()),
    );

    // Re-enable foreign key constraints
    await this.prisma.$executeRaw`PRAGMA foreign_keys = ON;`;

    // Reset auto-increment counters in SQLite
    await this.prisma.$executeRaw`DELETE FROM sqlite_sequence`;

    this.logger.log('Database cleared successfully');
  }

  async seedDatabase() {
    this.logger.log('Seeding database...');

    try {
      // Clear existing data
      await this.clearDatabase().catch((error) => {
        this.logger.error(`Failed to clear database: ${error.message}`);
      });
      // Seed with simple data
      await this.seedCategories().catch((error) => {
        this.logger.error(`Failed to seed categories: ${error.message}`);
      });
      await this.seedAssets().catch((error) => {
        this.logger.error(`Failed to seed assets: ${error.message}`);
      });
      await this.seedProfessions().catch((error) => {
        this.logger.error(`Failed to seed professions: ${error.message}`);
      });
      await this.seedUsers().catch((error) => {
        this.logger.error(`Failed to seed users: ${error.message}`);
      });

      await this.seedReports().catch((error) => {
        this.logger.error(`Failed to seed reports: ${error.message}`);
      });

      await this.seedInterventionRequests().catch((error) => {
        this.logger.error(
          `Failed to seed intervention requests: ${JSON.stringify(error)}`,
        );
      });

      await this.seedInterventions().catch((error) => {
        this.logger.error(`Failed to seed interventions: ${error.message}`);
      });


      await this.seedSchedule().catch((error) => {
        this.logger.error(`Failed to seed schedule: ${error.message}`);
      });

      // This is a placeholder - you'll need to implement the actual seeding logic

      this.logger.log('Database seeded successfully');
    } catch (error) {
      this.logger.error(`Failed to seed database: ${error.message}`);
      throw error;
    }
  }

  async seedAssets() {
    for (const site of assetsSeed) {
      const categoryId = randomInt(0, await this.prisma.category.count());
      const result_site = await this.assetsService.create({
        name: site.name,
        inventoryCode: site.inventoryCode,
        categoryId: categoryId == 0 ? undefined : categoryId,
        type: site.type as AssetType,
      });
      for (const zone of site.children) {
        const categoryId = randomInt(0, await this.prisma.category.count());
        const result_zone = await this.assetsService.create({
          name: zone.name,
          inventoryCode: zone.inventoryCode,
          type: zone.type as AssetType,
          categoryId: categoryId == 0 ? undefined : categoryId,

          locationId: result_site.id,
        });
        for (const equipement of zone.children) {
          const categoryId = randomInt(0, await this.prisma.category.count());
          await this.assetsService.create({
            name: equipement.name,
            inventoryCode: equipement.inventoryCode,
            categoryId: categoryId == 0 ? undefined : categoryId,
            type: equipement.type as AssetType,
            locationId: result_zone.id,
          });
        }
      }
    }
  }

  async seedProfessions() {
    for (const profession of professionsSeed) {
      await this.professionService.create(profession);
    }
  }

  async seedUsers() {
    const users = usersSeed.map((e, index) => {
      return {
        ...e,
        id: index + 1,
      };
    });

    for (const user of users) {
      await this.authService.registerUser({
        email: user.email,
        fullName: user.fullName,
        provider: 'google',
        providerId: 1,
        picture: 'https://avatar.iran.liara.run/public',
      });
      if (user.askingForPromotion) {
        await this.usersService.askPromotion(user.id, user.role as Role);
      } else {
        if (user.role === 'STAFF') {
          await this.usersService.validatePromotionRequest(user.id, true);
        } else {
          await this.usersService.setRoleToUser(user.id, user.role as Role);

          if (user.role === 'TECHNICIAN') {
            const allDays = Object.values(Day);
            const numAvailabilities = randomInt(1, allDays.length + 1); // random number between 1 and all days
            const shuffledDays = allDays.sort(() => Math.random() - 0.5);
            const selectedDays = shuffledDays.slice(0, numAvailabilities);

            await this.technicianService.updateTechnicianData(user.id, {
              professionId: randomInt(1, await this.prisma.profession.count()),
              availabilities: selectedDays.map((day) => ({
                day: day,
                startHour: randomInt(8, 12),
                endHour: randomInt(13, 17),
              })),
            });
          }
        }
      }

      // You can use the index variable here as needed
      this.logger.log(`Seeded user #${user.id}: ${user.email}`);
    }
  }

  async seedCategories() {
    const createCategory = async (data: {
      name: string;
      description: string;
      parentId: number | null;
    }) => {
      return this.categoriesService.createCategory(data);
    };

    const seedChildren = async (
      parentId: number,
      children: categoriesSeedType[],
    ) => {
      for (const category of children) {
        const result = await createCategory({
          name: category.name,
          description: category.description,
          parentId,
        });
        if (category.children) {
          await seedChildren(result.id, category.children); // recursive call
        }
        this.logger.log(`Seeded category #${result.id}: ${category.name}`);
      }
    };

    for (const category of categoriesSeed) {
      const result = await createCategory({
        name: category.name,
        description: category.description,
        parentId: null,
      });
      if (category.children) {
        await seedChildren(result.id, category.children);
      }
      this.logger.log(`Seeded category #${result.id}: ${category.name}`);
    }
  }

  async seedReports() {
    for (const report of reportsSeed(await this.prisma.asset.count())) {
      await this.reportsService.createReport(
        randomInt(1, await this.prisma.user.count()),
        {
          assetId: report.assetId,
          description: report.description,
          priority: report.priority,
          categoryId: report.categoryId,
          imageUrl: report.imageUrl,
        },
        'CORRECTIVE',
      );
      this.logger.log(
        `Seeded report #${report.assetId}: ${report.description}`,
      );
    }

    // cancel some of the reports
    let reports = await this.prisma.report.findMany({
      where: {
        status: 'PENDING',
      },
    });
    const reportsToCancel = randomInt(1, (reports.length + 1) / 3); // random number between 0 and reports.length
    const shuffledReports = reports.sort(() => Math.random() - 0.5);
    const selectedReports = shuffledReports.slice(0, reportsToCancel);
    for (const report of selectedReports) {
      await this.reportsService.cancelReport(report.id);
    }

    this.logger.log('Reports seeded successfully');
  }

  async seedInterventionRequests() {
    // Fetch all necessary data upfront
    const [reports, adminUsers, technicianUsers] = await Promise.all([
      this.prisma.report.findMany({ where: { status: 'PENDING' } }),
      this.prisma.user.findMany({
        where: { role: 'ADMIN', approvalStatus: 'VALIDATED' },
      }),
      this.prisma.user.findMany({
        where: { role: 'TECHNICIAN', approvalStatus: 'VALIDATED' },
      }),
    ]);

    if (!adminUsers.length || !technicianUsers.length) {
      this.logger.warn(
        'No admin or technician users found for intervention requests',
      );
      return;
    }

    // Select reports to assign
    const reportsToAssign = randomInt(1, reports.length);
    const shuffledReportsToAssign = [...reports].sort(
      () => Math.random() - 0.5,
    );
    const selectedReports = shuffledReportsToAssign.slice(0, reportsToAssign);

    // Prepare intervention request data
    const interventionRequests = selectedReports.map((report) => {
      const randomAdmin = adminUsers[randomInt(0, adminUsers.length)];

      const numTechnicians = Math.min(technicianUsers.length, randomInt(1, 4));
      const shuffledTechnicians = [...technicianUsers].sort(
        () => Math.random() - 0.5,
      );
      const randomTechnicians = shuffledTechnicians.slice(0, numTechnicians);

      // Generate a random date in 2025
      const start = new Date('2025-01-01').getTime();
      const end = new Date('2025-12-31').getTime();
      const randomTimestamp = start + Math.random() * (end - start);
      const deadline = new Date(randomTimestamp).toISOString().split('T')[0];

      return {
        adminId: randomAdmin.id,
        report,
        technicians: randomTechnicians,
        deadline,
      };
    });

    // Process in batches of 10
    const batchSize = 10;
    for (let i = 0; i < interventionRequests.length; i += batchSize) {
      const batch = interventionRequests.slice(i, i + batchSize);

      await Promise.all(
        batch.map(({ adminId, report, technicians, deadline }) =>
          this.interventionRequestsService.createInterventionRequest(adminId, {
            assignedTo: technicians.map((technician) => ({
              technicianId: technician.id,
            })),
            title: 'test',
            reportId: report.id,
            deadline,
          }),
        ),
      );

      this.logger.log(
        `Seeded batch of ${batch.length} intervention requests (${
          i + 1
        } to ${Math.min(i + batchSize, interventionRequests.length)})`,
      );
    }

    this.logger.log(
      `Completed seeding ${interventionRequests.length} intervention requests`,
    );
  }
  async seedInterventions() {
    const assignements = await this.prisma.technicianAssignement.findMany({
      where: {
        completed: false,
      },
      include: {
        technician: true,
        interventionRequest: true
      },
    });
    const shuffledAssignements = assignements
      .sort(() => Math.random() - 0.5)
      .slice(0, randomInt(1,assignements.length));

    for (const request of shuffledAssignements) {
      await this.interventionRequestsService.completeInterventionRequest(
        request.technician.userId,
        request.interventionRequestId,
        {
          description:
            interventionsSeed[randomInt(0, interventionsSeed.length)]
              .description,
        },
      );
      this.logger.log(
        `Seeded intervention request #${request.id}: ${request.interventionRequest.title}`,
      );
    }
  }

  async seedSchedule() {
    const admins = await this.prisma.user.findMany({
      where: {
        role: 'ADMIN',
        approvalStatus: 'VALIDATED',
      },
    });

    const assets = await this.prisma.asset.findMany({
      where: {
        type: AssetType.EQUIPMENT,
      },
    });

    for (const schedule of scheduleSeed) {
      const frequencies = [1, 7, 14, 30, 90, 180, 365];
      await this.reportsService.schedule(randomInt(1, admins.length), {
        assetId: randomInt(1, assets.length),
        description: schedule.description,
        lastMaintenanceDate: schedule.startDate.toISOString().split('T')[0],
        // frequency is either  1 or 7 days or 30 days or 90 days or 180 days or 365 days
        frequency: frequencies[randomInt(0, frequencies.length)],
        priority: Object.values(Priority)[randomInt(0, 3)],
      });
    }
  }
}
