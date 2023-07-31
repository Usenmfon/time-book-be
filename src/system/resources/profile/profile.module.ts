import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schema/profile.schema';
import { ProfileEventListener } from './event/register.event';
import { User, UserSchema } from 'src/auth/schema/auth.schema';
import { Org, OrgSchema } from '../org/schema/org.schema';
import { LinkAccountEventListener } from './event/code.event';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Org.name, schema: OrgSchema },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileEventListener, LinkAccountEventListener, ProfileService],
})
export class ProfileModule {}
