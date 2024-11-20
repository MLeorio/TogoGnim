import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema({ timestamps: true })
export class Store {
  @Prop({ required: true })
  store_name: string;

  @Prop()
  store_logo: string;

  @Prop({ required: true })
  store_tel: string;

  @Prop({ required: true })
  store_email: string;

  @Prop()
  store_website: string;

  @Prop({ default: true })
  store_is_Ecom: boolean;

  @Prop({ default: true })
  store_is_certified: boolean;

  @Prop()
  store_rate: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
