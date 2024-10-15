import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory } from './schema/sub-category.schema';
import mongoose from 'mongoose';

@Injectable()
export class SubCategoryService {

  constructor(
    @InjectModel(SubCategory.name)
    private subcategoryModel: mongoose.Model<SubCategory>,
  ) { }

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    return await this.subcategoryModel.create(createSubCategoryDto);
  }

  async findAll() {
    return await this.subcategoryModel.find().populate('category').exec()
  }

  async findOne(id: string) {
    const subcategory = await this.subcategoryModel.findById(id).populate('category').exec();

    if (!subcategory) throw new NotFoundException(`La sous catégorie avec l'id ${id} non trouvé`)

    return subcategory
  }

  async updateSubCategory(idC: string, updateCate: UpdateSubCategoryDto): Promise<SubCategory> {
    const { id, ...categorySet } = updateCate;

    if (idC != id) throw new ConflictException("Action non autorisée !");

    const subcategory = await this.subcategoryModel.findOneAndUpdate(
      { _id: idC },
      { $set: categorySet },
      { new: true }
    ).exec();

    if (!subcategory) throw new NotFoundException("Utilisateur non trouvé ou non actif");

    return subcategory;
  }

  async remove(id: string) {
    return await this.subcategoryModel.deleteOne({ _id: id });
  }
}
