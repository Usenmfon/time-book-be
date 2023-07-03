import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './schema/record.schema';
import { Profile, ProfileSchema } from '../profile/schema/profile.schema';
import { Org, OrgSchema } from '../org/schema/org.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Org.name, schema: OrgSchema },
      { name: Record.name, schema: RecordSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
