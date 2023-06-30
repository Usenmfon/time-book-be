import { Module } from '@nestjs/common';
import { ProfileModule } from '../resources/profile/profile.module';
import { OrgModule } from '../resources/org/org.module';
import { RecordModule } from '../resources/record/record.module';

@Module({ imports: [ProfileModule, OrgModule, RecordModule] })
export class ResourceModule {}
