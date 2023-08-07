import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/auth/schema/auth.schema';
import { Org } from '../../org/schema/org.schema';

@Schema({ timestamps: true })
export class Record {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Org', required: true })
  org: Org;

  @Prop({ type: Date })
  time_in: Date;

  @Prop({ type: Date })
  time_out: Date;
}

export type RecordDocument = HydratedDocument<Record>;
export const RecordSchema = SchemaFactory.createForClass(Record);
