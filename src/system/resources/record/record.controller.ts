import { Controller, Get, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { GetAuthUser } from 'src/auth/decorators/user.decorator';
import { IAuthUser } from 'src/auth/interfaces';
import { JwtAuthGuard } from 'src/helper/guard';

@UseGuards(JwtAuthGuard)
@Controller('user/record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  async getRecord(@GetAuthUser() user: IAuthUser) {
    return this.recordService.getRecord(user.id);
  }
}
