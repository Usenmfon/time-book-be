import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { GetAuthUser } from 'src/auth/decorators/user.decorator';
import { IAuthUser } from 'src/auth/interfaces';
import { JwtAuthGuard } from 'src/helper/guard';

@UseGuards(JwtAuthGuard)
@Controller('user/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@GetAuthUser() user: IAuthUser) {
    return this.profileService.getProfile(user.id);
  }
}
