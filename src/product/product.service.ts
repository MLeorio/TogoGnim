import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
    private imageaservice: ImageService
  ) {}

  async create(createProductDto: CreateProductDto, image_path: string): Promise<Product> {
    const product = new this.productModel({
      ...createProductDto
    });
    await this.imageaservice.createImage(image_path, product.id);
    return await product.save();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel
      .find()
      .populate(['sub_category', 'store', { path: 'images', select: 'file_path' }])
      .exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate(['sub_category', 'store'])
      .exec();
    if (!product) throw new NotFoundException('Produit non trouvé');
    return product;
  }

  async update(
    idP: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { id, ...productSet } = updateProductDto;

    if (idP != id) throw new ConflictException('Action non autorisée !');

    const product = await this.productModel
      .findOneAndUpdate({ _id: idP }, { $set: productSet }, { new: true })
      .populate(['sub_category', 'store'])
      .exec();

    if (!product) throw new NotFoundException('Produit non trouvé !');

    return product;
  }

  async remove(id: string) {
    await this.imageaservice.deleteImagesByProduct(id);
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}
