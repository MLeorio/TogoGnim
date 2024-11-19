import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SubCategory } from 'src/sub-category/schema/sub-category.schema';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ unique: true })
  category_name: string;

  @Prop({ default: 'Description de la catégorie' })
  category_description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'SubCategory' }] })
  subcategories: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
