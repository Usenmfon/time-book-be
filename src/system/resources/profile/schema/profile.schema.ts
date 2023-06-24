import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/auth/schema/auth.schema';

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: String,
    validate: [{ validator: isEmail, message: 'Please enter your email' }],
  })
  email: string;

  @Prop({ type: String })
  fullname: string;

  @Prop({ type: String })
  dob: string;

  @Prop({ type: String })
  location: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: String })
  avatar_id: string;
}

export type ProfileDocument = HydratedDocument<Profile>;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
