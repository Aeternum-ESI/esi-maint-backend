import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { CategoriesService } from './categories.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Roles(Role.ADMIN)
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Put('/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }

  @Get('subtree/:id')
  getCategorySubtree(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategorySubtree(id);
  }
}
