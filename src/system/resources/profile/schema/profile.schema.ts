import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/auth/schema/auth.schema';
import { Org } from '../../org/schema/org.schema';

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Org', required: true })
  org: Org;

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
}

export type ProfileDocument = HydratedDocument<Profile>;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
