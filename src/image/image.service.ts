import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './schema/image.schema';

@Injectable()
export class ImageService {
    constructor(
        @InjectModel('Image') private readonly imageModel: Model<ImageDocument>,
    ) { }

    async createImage(filePath: string, productId: string): Promise<Image> {
        const image = new this.imageModel({ file_path: filePath, product: productId });
        return image.save();
    }

    async findImagesByProduct(productId: string): Promise<Image[]> {
        return this.imageModel.find({ product: productId }).exec();
    }

    async deleteImagesByProduct(productId: string): Promise<void> {
        await this.imageModel.deleteMany({ product: productId }).exec();
    }
}
