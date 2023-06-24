import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthUser } from './interfaces';
import { SignInDto, SignUpDto } from './dto';
import { GoogleAuthGuard } from 'src/helper/guard';
import { GetAuthUser } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@GetAuthUser() user: any) {
    return this.authService.googleAuth(user);
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto): Promise<IAuthUser> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SignInDto): Promise<IAuthUser> {
    return this.authService.signin(dto);
  }
}
