import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { OrgService } from './org.service';
import { GetAuthUser } from 'src/auth/decorators/user.decorator';
import { IAuthUser } from 'src/auth/interfaces';
import { JwtAuthGuard } from 'src/helper/guard';
import { UpdateOrgDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('org')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get()
  async getOrg(@GetAuthUser() user: IAuthUser) {
    console.log(user);
    return this.orgService.getOrg(user.id);
  }

  @Put()
  async updateOrg(@GetAuthUser() user: IAuthUser, @Body() dto: UpdateOrgDto) {
    return this.orgService.updateOrg(user.id, dto);
  }
}
