import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Catégorie')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiCreatedResponse({
    description: "L'enrégistrement a été éffectué avec succès.",
  })
  @ApiForbiddenResponse({ description: 'Action Interdite.' })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return {
      status: HttpStatus.CREATED,
      data: category,
      message: 'Catégorie ajoutée avec succès !',
    };
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAllCategory();
    return {
      status: HttpStatus.OK,
      data: categories,
      message: 'La liste de toutes les Catégories.',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);

    return {
      status: HttpStatus.OK,
      data: category,
      message: `La catégorie avec l'id ${id} récupéré avec succès`,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const category = await this.categoryService.updateCategory(
        id,
        updateCategoryDto,
      );
      return {
        status: HttpStatus.OK,
        data: category,
        message: 'Mise à jour des infos de catégorie réussie !',
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: e.errmsg,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
    return {
      status: HttpStatus.OK,
      message: 'Catégorie supprimée avec succès !',
    };
  }
}
