import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnnexeDto } from './dto/create-annexe.dto';
import { UpdateAnnexeDto } from './dto/update-annexe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Annexe } from './schemas/annexe.schema';
import mongoose from 'mongoose';

@Injectable()
export class AnnexeService {
  constructor(
    @InjectModel(Annexe.name)
    private annexeModel: mongoose.Model<Annexe>,
  ) {}

  async create(createAnnexeDto: CreateAnnexeDto): Promise<Annexe> {
    return await this.annexeModel.create(createAnnexeDto);
  }

  async findAll(): Promise<Annexe[]> {
    return await this.annexeModel.find().populate('store').exec();
  }

  async findOne(id: string) {
    return await this.annexeModel.findById(id).populate('store').exec();
  }

  async update(idA: string, updateAnnexeDto: UpdateAnnexeDto) {
    const { id, ...annexeSet } = updateAnnexeDto;

    if (idA != id) throw new ConflictException('Action non autorisée !');

    const annexe = await this.annexeModel
      .findOneAndUpdate({ _id: idA }, { $set: annexeSet }, { new: true })
      .populate('store')
      .exec();

    if (!annexe) throw new NotFoundException('Annexe non trouvée !');

    return annexe;
  }

  async remove(id: string) {
    return await this.annexeModel.findByIdAndDelete(id).exec();
  }
}
