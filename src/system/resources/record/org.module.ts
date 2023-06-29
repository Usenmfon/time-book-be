import { Module } from '@nestjs/common';
import { OrgService } from './record.service';
import { OrgController } from './record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Org, OrgSchema } from './schema/record.schema';
import { User, UserSchema } from 'src/auth/schema/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Org.name, schema: OrgSchema },
    ]),
  ],
  controllers: [OrgController],
  providers: [OrgService],
})
export class OrgModule {}
