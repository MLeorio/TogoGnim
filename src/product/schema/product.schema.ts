import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    product_name: string;

    @Prop()
    product_description: string

    @Prop({ default: true })
    product_is_new: boolean

    @Prop({ type: Types.ObjectId, ref: 'SubCategory', required: true })
    sub_category: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
    store: Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product)
