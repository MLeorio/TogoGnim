import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put, UseGuards, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBadRequestResponse,
        ApiBearerAuth,
        ApiCreatedResponse,
        ApiNotFoundResponse,
        ApiOkResponse,
        ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Store } from './schemas/store.schema';


@ApiTags('Boutiques')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateStoreDto,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @Req() req : any
  ) {
    console.log(req.user.userId);

    const userId = await req.user.userId;
    const store = await this.storeService.create(createStoreDto, userId);

    return {
      status: HttpStatus.CREATED,
      data: store,
      message: "Boutique ajoutée avec succès !"
    }
  }


  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: Store,
    isArray: true,
  })
  @ApiBearerAuth()
  @Get()
  async findAll() {
    const stores = await this.storeService.findAll();
    return {
      status: HttpStatus.OK,
      data: stores,
      message: "La liste de toutes les boutiques."
    }
  }

  @Get(':id')
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiOkResponse({
    type: Store,
    isArray: false,
  })
  async findOne(@Param('id') id: string) {
    try {
      const store = await this.storeService.findOne(id);
      return {
        status: HttpStatus.OK,
        data: store,
        message: `La boutique ${store.store_name} récupéré avec succès`
      }
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message
      }
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    try {
      const store = await this.storeService.update(id, updateStoreDto);
      return {
        status: HttpStatus.OK,
        data: store,
        message: `La boutique ${store.store_name} a été mise à jour`
      }
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const store = await this.storeService.remove(id);
      return {
        status: HttpStatus.ACCEPTED,
        data: store,
        message: `La boutique ${store.store_name} a été retiré avec succès !`
      }
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message
      }
    }
  }


}
