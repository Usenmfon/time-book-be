import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

enum Role {
  user = 'user',
  org = 'org',
}

export class SignUpDto {
  @IsString()
  @IsOptional()
  fullname?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role, { message: 'role  must be a valid role type' })
  @IsOptional()
  role: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  refreshToken: string;
}

export class SignUpHookDto {
  @IsObject()
  event: { name: string; type: string };

  @IsObject()
  data: {
    created_at?: string;
    email?: string;
    email_verified?: string;
    fullname?: string;
    last_password_reset?: string;
    updated_at?: string;
  };
}
