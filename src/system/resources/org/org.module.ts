import { Module } from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgController } from './org.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Org, OrgSchema } from './schema/org.schema';
import { User, UserSchema } from 'src/auth/schema/auth.schema';
import { OrgEventListener } from './event/org.event';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Org.name, schema: OrgSchema },
    ]),
  ],
  controllers: [OrgController],
  providers: [OrgEventListener, OrgService],
})
export class OrgModule {}
