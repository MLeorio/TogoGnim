import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema({ timestamps: true })
export class Image {
    @Prop({ required: true })
    file_path: string;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product: Types.ObjectId;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
