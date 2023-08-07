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

  @Prop({ type: Object })
  location: {
    type: string;
    coordinates: [number, number];
  };
}

export type OrgDocument = HydratedDocument<Org>;

const OrgSchema = SchemaFactory.createForClass(Org);
OrgSchema.index({ location: '2dsphere' });
export { OrgSchema };
