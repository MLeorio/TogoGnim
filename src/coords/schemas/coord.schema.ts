import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Coord>

export class Coord {

    @Prop({ required: true })
    longitude: string;


    @Prop({ required: true })
    latitude: string;

    @Prop({ type: Types.ObjectId, ref: 'Annexe', required: true })
    annexe: Types.ObjectId
}

export const CoordSchema = SchemaFactory.createForClass(Coord)
