import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './schema/record.schema';
import { User, UserSchema } from 'src/auth/schema/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Record.name, schema: RecordSchema },
    ]),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
