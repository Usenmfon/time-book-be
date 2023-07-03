import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { GetAuthUser } from 'src/auth/decorators/user.decorator';
import { IAuthUser } from 'src/auth/interfaces';
import { JwtAuthGuard } from 'src/helper/guard';
import { UpdateProfileDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('user/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@GetAuthUser() user: IAuthUser) {
    console.log(user);
    return this.profileService.getProfile(user.id);
  }

  @Put()
  async updateProfile(
    @GetAuthUser() user: IAuthUser,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(user.id, dto);
  }

  @Put('/code')
  async updateCode(
    @GetAuthUser() user: IAuthUser,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateCode(user.id, dto);
  }
}
