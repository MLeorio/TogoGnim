import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CoordsService } from './coords.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateCoordDto } from './dto/create-coord.dto';
import { UpdateCoordDto } from './dto/update-coord.dto';
import { Coord } from './schemas/coord.schema';

@ApiTags("Coordonnées")
@Controller('Coordonnées')
export class CoordController {
  constructor(private readonly coordService: CoordsService) {}

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateCoordDto,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async create(@Body() createCoordDto: CreateCoordDto) {

    const coord = await this.coordService.create(createCoordDto);
    return {
      status: HttpStatus.CREATED,
      data: coord,
      message: "Coordonnées ajoutée avec succès !"
    }
  }


  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: [Coord],
    isArray: true,
  })
  // @ApiBearerAuth()
  @Get()
  async findAll() {
    const coords = await this.coordService.findAll();
    return {
      status: HttpStatus.OK,
      data: coords,
      message: "La liste de toutes les coordonnées."
    }
  }


  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiOkResponse({
    type: Coord,
    isArray: false,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const coord = await this.coordService.findOne(id);
      return {
        status: HttpStatus.OK,
        data: coord,
        message: "Coordonnées récupérée avec succès"
      }
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCoordDto: UpdateCoordDto) {
    try {
      const coord = await this.coordService.update(id, updateCoordDto);
      return {
        status: HttpStatus.OK,
        data: coord,
        message: `Coordonnées mise à jour`
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
      const coord = await this.coordService.remove(id);
      return {
        status: HttpStatus.ACCEPTED,
        data: coord,
        message: `Coordonnées retiré avec succès !`
      }
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message
      }
    }
  }
}
