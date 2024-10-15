import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/category.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.create(createCategoryDto);
  }

  async findAllCategory(): Promise<Category[]> {
    return await this.categoryModel.find().populate('subcategories').exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) throw new NotFoundException(`La catégorie avec l'id ${id} non trouvé`)

    return category
  }

  async updateCategory(idC: string, updateCate: UpdateCategoryDto): Promise<Category> {
    const { id, ...categorySet } = updateCate;

    if (idC != id) throw new ConflictException("Action non autorisée !");

    const category = await this.categoryModel.findOneAndUpdate(
      { _id: idC },
      { $set: categorySet },
      { new: true }
    ).exec();

    if (!category) throw new NotFoundException("Utilisateur non trouvé ou non actif");

    return category;
  }

  async remove(id: string) {
    return await this.categoryModel.deleteOne({ _id: id });
  }

}
