import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrgService } from './org.service';
import { GetAuthUser } from 'src/auth/decorators/user.decorator';
import { IAuthUser } from 'src/auth/interfaces';
import { JwtAuthGuard } from 'src/helper/guard';

@UseGuards(JwtAuthGuard)
@Controller('user/org')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get()
  async getOrg(@GetAuthUser() user: IAuthUser) {
    return this.orgService.getOrg(user.id);
  }
}
