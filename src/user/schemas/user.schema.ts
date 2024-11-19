import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  active: boolean;

  @Prop({ default: undefined })
  resetPasswordToken?: string;

  @Prop({ default: undefined })
  resetPasswordExpires?: Date;

  @Prop({ required: true, default: 'Producer' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
