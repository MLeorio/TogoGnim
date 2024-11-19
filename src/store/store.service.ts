import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './schemas/store.schema';
import mongoose from 'mongoose';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private storeModel: mongoose.Model<Store>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createStoreDto: CreateStoreDto, user: string): Promise<Store> {
    const store = new this.storeModel(createStoreDto);
    store.user = user;

    return await store.save();
  }

  async findAll(): Promise<Store[]> {
    return await this.storeModel.find().populate('category').exec();
  }

  async findOne(id: string): Promise<Store> {
    return this.storeModel.findById(id).populate('category').exec();
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    return await this.storeModel
      .findByIdAndUpdate(id, updateStoreDto, { new: true })
      .populate('category')
      .exec();
  }

  async remove(id: string): Promise<Store> {
    return await this.storeModel.findByIdAndDelete(id).exec();
  }
}
