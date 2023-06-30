import { Module } from '@nestjs/common';
import { ResourceModule } from './modules';

@Module({ imports: [ResourceModule] })
export class SystemModule {}
