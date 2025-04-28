import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { Category } from 'prisma/generated/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    // Get all categories (flat list)
    const categories: Category[] = await this.prisma.category.findMany();

    // Get closure records for direct children only (depth === 1)
    const closures = await this.prisma.categoryClosure.findMany({
      where: { depth: 1 },
      include: { descendant: true },
    });

    // Build a map: parentId -> array of child categories
    const childrenMap: Record<number, Category[]> = {};
    closures.forEach((record) => {
      const parentId = record.ancestorId;
      if (!childrenMap[parentId]) {
        childrenMap[parentId] = [];
      }
      childrenMap[parentId].push(record.descendant);
    });

    // Helper to recursively build the tree
    const buildTree = (parent: Category): any => ({
      ...parent,
      children: (childrenMap[parent.id] || []).map((child) => buildTree(child)),
    });

    // Filter root categories (those without a parent) and build the tree
    const tree = categories
      .filter((cat) => cat.parentId === null)
      .map((root) => buildTree(root));

    return tree;
  }

  async getCategorySubtree(categoryId: number) {
    // Step 1: Fetch all descendant categories (including the category itself)
    const descendants = await this.prisma.categoryClosure.findMany({
      where: { ancestorId: categoryId },
      include: { descendant: true },
    });

    // Step 2: Fetch the root category separately
    const rootCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!rootCategory) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    // Step 3: Build a map of parentId -> array of child categories
    const childrenMap: Record<number, Category[]> = {};
    descendants.forEach((record) => {
      const parentId = record.descendant.parentId;
      if (parentId !== null) {
        if (!childrenMap[parentId]) {
          childrenMap[parentId] = [];
        }
        childrenMap[parentId].push(record.descendant);
      }
    });

    // Step 4: Recursive function to construct the tree
    const buildTree = (parent: Category): any => ({
      ...parent,
      children: (childrenMap[parent.id] || []).map((child) => buildTree(child)),
    });

    // Step 5: Build the tree starting from the given category
    return buildTree(rootCategory);
  }

  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async createCategory(data: CreateCategoryDto) {
    // First, create the category
    const category = await this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        parentId: data.parentId,
      },
    });

    // Create self-reference closure entry (depth 0)
    await this.prisma.categoryClosure.create({
      data: {
        ancestorId: category.id,
        descendantId: category.id,
        depth: 0,
      },
    });

    // If there's a parent, create closure entries based on parent's ancestors
    if (data.parentId) {
      // Get all ancestors of the parent
      const parentClosures = await this.prisma.categoryClosure.findMany({
        where: { descendantId: data.parentId },
      });
      // For each ancestor of the parent, create a relation to the new category
      const closureData = parentClosures.map((closure) => ({
        ancestorId: closure.ancestorId,
        descendantId: category.id,
        depth: closure.depth + 1,
      }));
      if (closureData.length > 0) {
        await this.prisma.categoryClosure.createMany({
          data: closureData,
        });
      }
    }

    return category;
  }

  async updateCategory(id: number, data: UpdateCategoryDto) {
    // Check if category exists
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // If parentId is changing, update the closure table
    if (
      data.parentId !== undefined &&
      data.parentId !== existingCategory.parentId
    ) {
      // Prevent circular reference
      if (data.parentId === id) {
        throw new ConflictException(`Category cannot be its own parent`);
      }

      // If new parent is not null, check if it exists and prevent cycles
      if (data.parentId !== null) {
        const parentExists = await this.prisma.category.findUnique({
          where: { id: data.parentId },
        });
        if (!parentExists) {
          throw new NotFoundException(
            `Parent category with ID ${data.parentId} not found`,
          );
        }

        // Check if the new parent is not a descendant of this category (prevent cycles)
        const isDescendant = await this.prisma.categoryClosure.findFirst({
          where: {
            ancestorId: id,
            descendantId: data.parentId,
          },
        });
        if (isDescendant) {
          throw new ConflictException(
            `Cannot set a descendant as parent (would create a cycle)`,
          );
        }
      }

      // Update closure table entries
      await this._updateCategoryHierarchy(id, data.parentId);
    }

    // Update category data
    return await this.prisma.category.update({
      where: { id },
      data: {
        name: data.name !== undefined ? data.name : undefined,
        description:
          data.description !== undefined ? data.description : undefined,
        parentId: data.parentId !== undefined ? data.parentId : undefined,
      },
    });
  }

  async deleteCategory(id: number) {
    // Check if category exists
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { children: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Delete the category itself
    return await this.prisma.category.delete({
      where: { id },
    });
  }

  // Helper method to update category hierarchy in the closure table
  private async _updateCategoryHierarchy(
    categoryId: number,
    newParentId: number | null,
  ) {
    // Delete all existing non-self closure entries for this category
    await this.prisma.categoryClosure.deleteMany({
      where: {
        descendantId: categoryId,
        NOT: { ancestorId: categoryId },
      },
    });

    // Get all descendants of the category
    const descendants = await this.prisma.categoryClosure.findMany({
      where: {
        ancestorId: categoryId,
        NOT: { descendantId: categoryId },
      },
    });

    // For each descendant, delete relationships to ancestors through this category
    for (const descendant of descendants) {
      await this.prisma.categoryClosure.deleteMany({
        where: {
          descendantId: descendant.descendantId,
          ancestorId: { not: descendant.descendantId },
          AND: { NOT: { ancestorId: categoryId } },
        },
      });
    }

    // If we have a new parent, create new closure entries
    if (newParentId !== null) {
      // Get all ancestor closures of the new parent
      const parentClosures = await this.prisma.categoryClosure.findMany({
        where: { descendantId: newParentId },
      });

      // Create new relationships between all ancestors of the new parent and this category
      const categoryClosures = parentClosures.map((closure) => ({
        ancestorId: closure.ancestorId,
        descendantId: categoryId,
        depth: closure.depth + 1,
      }));
      if (categoryClosures.length > 0) {
        await this.prisma.categoryClosure.createMany({
          data: categoryClosures,
        });
      }

      // For each ancestor of the parent and each descendant, create new closure entries
      for (const ancestor of parentClosures) {
        for (const descendant of descendants) {
          await this.prisma.categoryClosure.create({
            data: {
              ancestorId: ancestor.ancestorId,
              descendantId: descendant.descendantId,
              depth: ancestor.depth + 1 + descendant.depth,
            },
          });
        }
      }
    }
  }
}
