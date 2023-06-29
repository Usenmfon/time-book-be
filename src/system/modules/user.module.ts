import { Module } from '@nestjs/common';
import { ProfileModule } from '../resources/profile/profile.module';
import { OrgModule } from '../resources/org/org.module';

@Module({ imports: [ProfileModule, OrgModule] })
export class UserModule {}
