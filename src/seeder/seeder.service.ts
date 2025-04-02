import { Injectable, Logger } from '@nestjs/common';
import { AssetStatus, AssetType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { AssetsService } from '../modules/assets/assets.service';
import { CategoriesService } from '../modules/categories/categories.service';
import { ProfessionsService } from '../modules/professions/professions.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService,
    private readonly professionsService: ProfessionsService,
    private readonly assetsService: AssetsService,
  ) {}

  async seed() {
    try {
      this.logger.log('Starting database seeding...');

      // Clear existing data
      await this.clearDatabase();

      // Seed data in proper order (to maintain relationships)
      await this.seedCategories();
      await this.seedProfessions();
      await this.seedAssets();

      this.logger.log('Database seeding completed successfully!');
      return true;
    } catch (error) {
      this.logger.error(`Seeding failed: ${error.message}`);
      this.logger.error(error.stack);
      throw error;
    }
  }

  async clearDatabase() {
    try {
      this.logger.log('Clearing existing data...');

      // Make sure we have a clean connection
      this.logger.log('Ensuring clean database connection...');

      // Delete data in reverse order of dependencies
      // Try each deletion separately to avoid cascading failures
      try {
        await this.prisma.interventionRequest.deleteMany();
        this.logger.log('Cleared intervention requests');
      } catch (e) {
        this.logger.warn(`Failed to clear intervention requests: ${e.message}`);
      }

      try {
        await this.prisma.schedule.deleteMany();
        this.logger.log('Cleared schedules');
      } catch (e) {
        this.logger.warn(`Failed to clear schedules: ${e.message}`);
      }

      try {
        await this.prisma.report.deleteMany();
        this.logger.log('Cleared reports');
      } catch (e) {
        this.logger.warn(`Failed to clear reports: ${e.message}`);
      }

      try {
        await this.prisma.technicianAvailability.deleteMany();
        this.logger.log('Cleared technician availabilities');
      } catch (e) {
        this.logger.warn(
          `Failed to clear technician availabilities: ${e.message}`,
        );
      }

      try {
        await this.prisma.technicianAssignement.deleteMany();
        this.logger.log('Cleared technician assignments');
      } catch (e) {
        this.logger.warn(
          `Failed to clear technician assignments: ${e.message}`,
        );
      }

      try {
        await this.prisma.notification.deleteMany();
        this.logger.log('Cleared notifications');
      } catch (e) {
        this.logger.warn(`Failed to clear notifications: ${e.message}`);
      }

      try {
        await this.prisma.asset.deleteMany();
        this.logger.log('Cleared assets');
      } catch (e) {
        this.logger.warn(`Failed to clear assets: ${e.message}`);
      }

      try {
        await this.prisma.categoryClosure.deleteMany();
        this.logger.log('Cleared category closures');
      } catch (e) {
        this.logger.warn(`Failed to clear category closures: ${e.message}`);
      }

      try {
        await this.prisma.category.deleteMany();
        this.logger.log('Cleared categories');
      } catch (e) {
        this.logger.warn(`Failed to clear categories: ${e.message}`);
      }

      try {
        await this.prisma.profession.deleteMany();
        this.logger.log('Cleared professions');
      } catch (e) {
        this.logger.warn(`Failed to clear professions: ${e.message}`);
      }

      this.logger.log('Database cleared!');
    } catch (error) {
      this.logger.error(`Failed to clear database: ${error.message}`);
      throw error;
    }
  }

  async seedCategories() {
    this.logger.log('Seeding categories...');

    // Create root categories
    const furnitureCategory = await this.categoriesService.createCategory({
      name: 'Furniture',
      description: 'All furniture items',
      parentId: null,
    });

    const electronicsCategory = await this.categoriesService.createCategory({
      name: 'Electronics',
      description: 'Electronic devices and equipment',
      parentId: null,
    });

    const hvacCategory = await this.categoriesService.createCategory({
      name: 'HVAC',
      description: 'Heating, Ventilation and Air Conditioning',
      parentId: null,
    });

    // Create subcategories
    await this.categoriesService.createCategory({
      name: 'Chairs',
      description: 'Office and classroom chairs',
      parentId: furnitureCategory.id,
    });

    await this.categoriesService.createCategory({
      name: 'Tables',
      description: 'Desks and work tables',
      parentId: furnitureCategory.id,
    });

    await this.categoriesService.createCategory({
      name: 'Cabinets',
      description: 'Storage furniture',
      parentId: furnitureCategory.id,
    });

    const computersCategory = await this.categoriesService.createCategory({
      name: 'Computers',
      description: 'Desktop and laptop computers',
      parentId: electronicsCategory.id,
    });

    await this.categoriesService.createCategory({
      name: 'Printers',
      description: 'Printing devices',
      parentId: electronicsCategory.id,
    });

    await this.categoriesService.createCategory({
      name: 'Projectors',
      description: 'Multimedia projectors',
      parentId: electronicsCategory.id,
    });

    // Third level categories
    await this.categoriesService.createCategory({
      name: 'Desktop Computers',
      description: 'Stationary computers',
      parentId: computersCategory.id,
    });

    await this.categoriesService.createCategory({
      name: 'Laptops',
      description: 'Portable computers',
      parentId: computersCategory.id,
    });

    await this.categoriesService.createCategory({
      name: 'Air Conditioners',
      description: 'Cooling systems',
      parentId: hvacCategory.id,
    });

    await this.categoriesService.createCategory({
      name: 'Heaters',
      description: 'Heating systems',
      parentId: hvacCategory.id,
    });

    this.logger.log('Categories seeded!');
  }

  async seedProfessions() {
    this.logger.log('Seeding professions...');

    const professions = [
      { name: 'Electrician' },
      { name: 'Plumber' },
      { name: 'HVAC Technician' },
      { name: 'Carpenter' },
      { name: 'IT Support' },
      { name: 'General Maintenance' },
      { name: 'Janitor' },
      { name: 'Security' },
    ];

    for (const profession of professions) {
      await this.professionsService.create(profession);
    }

    this.logger.log('Professions seeded!');
  }

  async seedAssets() {
    this.logger.log('Seeding assets...');

    // Create sites
    const mainSite = await this.createAsset({
      name: 'Main Building',
      inventoryCode: 'BLDG-001',
      type: AssetType.SITE,
    });

    const scienceSite = await this.createAsset({
      name: 'Science Building',
      inventoryCode: 'BLDG-002',
      type: AssetType.SITE,
    });

    const adminSite = await this.createAsset({
      name: 'Administration Building',
      inventoryCode: 'BLDG-003',
      type: AssetType.SITE,
    });

    // Create zones in the main site
    const classroom101 = await this.createAsset({
      name: 'Classroom 101',
      inventoryCode: 'ROOM-101',
      locationId: mainSite.id,
      type: AssetType.ZONE,
    });

    const classroom102 = await this.createAsset({
      name: 'Classroom 102',
      inventoryCode: 'ROOM-102',
      locationId: mainSite.id,
      type: AssetType.ZONE,
    });

    const computerLab = await this.createAsset({
      name: 'Computer Lab',
      inventoryCode: 'ROOM-103',
      locationId: mainSite.id,
      type: AssetType.ZONE,
    });

    // Create zones in science site
    const chemistryLab = await this.createAsset({
      name: 'Chemistry Laboratory',
      inventoryCode: 'ROOM-201',
      locationId: scienceSite.id,
      type: AssetType.ZONE,
    });

    const physicsLab = await this.createAsset({
      name: 'Physics Laboratory',
      inventoryCode: 'ROOM-202',
      locationId: scienceSite.id,
      type: AssetType.ZONE,
    });

    // Create zones in admin site
    const principalOffice = await this.createAsset({
      name: 'Principal Office',
      inventoryCode: 'ROOM-301',
      locationId: adminSite.id,
      type: AssetType.ZONE,
    });

    const staffRoom = await this.createAsset({
      name: 'Staff Room',
      inventoryCode: 'ROOM-302',
      locationId: adminSite.id,
      type: AssetType.ZONE,
    });

    // Get category IDs
    const categories = await this.prisma.category.findMany();
    const getCategory = (name: string) =>
      categories.find((c) => c.name === name)?.id;

    const furnitureCatId = getCategory('Furniture');
    const chairsCatId = getCategory('Chairs');
    const tablesCatId = getCategory('Tables');
    const electronicsCatId = getCategory('Electronics');
    const computersCatId = getCategory('Computers');
    const printersCatId = getCategory('Printers');
    const projectorsCatId = getCategory('Projectors');
    const hvacCatId = getCategory('HVAC');
    const acCatId = getCategory('Air Conditioners');

    // Add equipment to zones
    // Classroom 101 equipment
    await this.createAsset({
      name: 'Projector CL101',
      inventoryCode: 'PROJ-001',
      locationId: classroom101.id,
      categoryId: projectorsCatId,
      type: AssetType.EQUIPMENT,
    });

    await this.createAsset({
      name: 'Teacher Desk CL101',
      inventoryCode: 'DESK-001',
      locationId: classroom101.id,
      categoryId: tablesCatId,
      type: AssetType.EQUIPMENT,
    });

    for (let i = 1; i <= 30; i++) {
      await this.createAsset({
        name: `Student Chair CL101-${i}`,
        inventoryCode: `CHAIR-CL101-${i}`,
        locationId: classroom101.id,
        categoryId: chairsCatId,
        type: AssetType.EQUIPMENT,
      });
    }

    // Computer Lab equipment
    for (let i = 1; i <= 20; i++) {
      await this.createAsset({
        name: `Computer ${i}`,
        inventoryCode: `PC-LAB-${i}`,
        locationId: computerLab.id,
        categoryId: computersCatId,
        type: AssetType.EQUIPMENT,
      });
    }

    await this.createAsset({
      name: 'LaserJet Printer',
      inventoryCode: 'PRINT-LAB-1',
      locationId: computerLab.id,
      categoryId: printersCatId,
      type: AssetType.EQUIPMENT,
    });

    // Admin equipment
    await this.createAsset({
      name: 'Principal Computer',
      inventoryCode: 'PC-ADMIN-1',
      locationId: principalOffice.id,
      categoryId: computersCatId,
      type: AssetType.EQUIPMENT,
    });

    // HVAC for sites
    await this.createAsset({
      name: 'Main Building AC',
      inventoryCode: 'AC-MAIN-1',
      locationId: mainSite.id,
      categoryId: acCatId,
      type: AssetType.EQUIPMENT,
    });

    await this.createAsset({
      name: 'Science Building AC',
      inventoryCode: 'AC-SCI-1',
      locationId: scienceSite.id,
      categoryId: acCatId,
      type: AssetType.EQUIPMENT,
    });

    this.logger.log('Assets seeded!');
  }

  private async createAsset(data: {
    name: string;
    inventoryCode: string;
    locationId?: number;
    categoryId?: number;
    type: AssetType;
  }) {
    return this.prisma.asset.create({
      data: {
        ...data,
        status: AssetStatus.OPERATIONAL,
      },
    });
  }
}
