import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { GetAuthUser } from 'src/auth/decorators/user.decorator';
import { IAuthUser } from 'src/auth/interfaces';
import { JwtAuthGuard } from 'src/helper/guard';
import { CreateRecordDto, UpdateRecordDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  async getRecord(@GetAuthUser() user: IAuthUser) {
    return this.recordService.getRecord(user.id);
  }

  @Post()
  async createRecord(
    @GetAuthUser() user: IAuthUser,
    @Body() dto: CreateRecordDto,
  ) {
    return this.recordService.createRecord(user.id, dto);
  }

  @Put()
  async updateRecord(
    @GetAuthUser() user: IAuthUser,
    @Body() dto: UpdateRecordDto,
  ) {
    return this.recordService.updateRecord(user.id, dto);
  }
}
