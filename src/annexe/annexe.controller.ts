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
import { AnnexeService } from './annexe.service';
import { CreateAnnexeDto } from './dto/create-annexe.dto';
import { UpdateAnnexeDto } from './dto/update-annexe.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Annexe } from './schemas/annexe.schema';

@ApiTags('Annexe')
@Controller('annexe')
export class AnnexeController {
  constructor(private readonly annexeService: AnnexeService) {}

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateAnnexeDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async create(@Body() createAnnexeDto: CreateAnnexeDto) {
    const annexe = await this.annexeService.create(createAnnexeDto);
    return {
      status: HttpStatus.CREATED,
      data: annexe,
      message: 'Annexe ajoutée avec succès !',
    };
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: [Annexe],
    isArray: true,
  })
  // @ApiBearerAuth()
  @Get()
  async findAll() {
    const annexes = await this.annexeService.findAll();
    return {
      status: HttpStatus.OK,
      data: annexes,
      message: 'La liste de toutes les annexes.',
    };
  }

  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiOkResponse({
    type: Annexe,
    isArray: false,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const annexe = await this.annexeService.findOne(id);
      return {
        status: HttpStatus.OK,
        data: annexe,
        message: `L'annexe ${annexe.annexe_name} récupérée avec succès`,
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
    @Body() updateAnnexeDto: UpdateAnnexeDto,
  ) {
    try {
      const annexe = await this.annexeService.update(id, updateAnnexeDto);
      return {
        status: HttpStatus.OK,
        data: annexe,
        message: `L'annexe ${annexe.annexe_name} a été mise à jour`,
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
      const annexe = await this.annexeService.remove(id);
      return {
        status: HttpStatus.ACCEPTED,
        data: annexe,
        message: `L'annexe ${annexe.annexe_name} a été retiré avec succès !`,
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }
}
