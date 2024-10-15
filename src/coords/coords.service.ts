import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoordDto } from './dto/create-coord.dto';
import { UpdateCoordDto } from './dto/update-coord.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coord } from './schemas/coord.schema';
import mongoose from 'mongoose';

@Injectable()
export class CoordsService {

  constructor(
    @InjectModel(Coord.name)
    private coordModel: mongoose.Model<Coord>
  ) {}

  async create(createCoordDto: CreateCoordDto): Promise<Coord> {
    return await this.coordModel.create(createCoordDto);
  }

  async findAll(): Promise<Coord[]> {
    return await this.coordModel.find().populate("annexe").exec();
  }

  async findOne(id: string): Promise<Coord> {
    return await this.coordModel.findById(id).populate("annexe").exec();
  }

  async update(idC: string, updateCoordDto: UpdateCoordDto): Promise<Coord> {
    const { id, ...coordSet } = updateCoordDto;

    if (idC != id) throw new ConflictException("Action non autorisée !");

    const coord = await this.coordModel.findOneAndUpdate(
      { _id: idC },
      { $set: coordSet },
      { new: true }
    ).populate("annexe").exec();

    if (!coord) throw new NotFoundException("Coordonnées non trouvée !");

    return coord;
  }

  async remove(id: string) {
    return await this.coordModel.findByIdAndDelete(id).exec();
  }
}
