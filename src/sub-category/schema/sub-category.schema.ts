import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({ unique: true })
  sub_category_name: string;

  @Prop({ default: 'Description de la sous catégorie' })
  sub_category_description: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
