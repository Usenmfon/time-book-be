import { Module } from '@nestjs/common';
import { ProfileModule } from '../resources/profile/profile.module';

@Module({ imports: [ProfileModule] })
export class UserModule {}
