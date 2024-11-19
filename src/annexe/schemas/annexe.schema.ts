import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Annexe>;

export class Annexe {
  @Prop({ required: true })
  annexe_name: string;

  @Prop({ required: true })
  annexe_tel: string;

  @Prop({ required: true })
  annexe_adresse: string;

  @Prop()
  annexe_image: string;

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  store: Types.ObjectId;
}

export const AnnexeSchema = SchemaFactory.createForClass(Annexe);
