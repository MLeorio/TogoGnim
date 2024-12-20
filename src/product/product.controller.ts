import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Product } from './schema/product.schema';

@ApiTags('Produits')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateProductDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return {
      status: HttpStatus.CREATED,
      data: product,
      message: 'Produit ajouté avec succès !',
    };
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: [Product],
    isArray: true,
  })
  // @ApiBearerAuth()
  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return {
      status: HttpStatus.OK,
      data: products,
      message: 'La liste de tous les produits.',
    };
  }

  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiOkResponse({
    type: Product,
    isArray: false,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.findOne(id);
      return {
        status: HttpStatus.OK,
        data: product,
        message: `Le produit ${product.product_name} récupéré avec succès`,
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.productService.update(id, updateProductDto);
      return {
        status: HttpStatus.OK,
        data: product,
        message: `Le produit ${product.product_name} a été mise à jour`,
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const product = await this.productService.remove(id);
      return {
        status: HttpStatus.ACCEPTED,
        data: product,
        message: `Le produit ${product.product_name} a été retiré avec succès !`,
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }
}
