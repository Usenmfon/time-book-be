import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/auth/schema/auth.schema';

@Schema({ timestamps: true })
export class Org {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: String,
  })
  org_code: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({ type: Array })
  location: [number, number];
}

export type OrgDocument = HydratedDocument<Org>;
export const OrgSchema = SchemaFactory.createForClass(Org);
