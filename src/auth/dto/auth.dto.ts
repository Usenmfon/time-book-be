import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
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
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role, { message: 'role  must be a valid role type' })
  @IsOptional()
  role: string;

  @IsOptional()
  @IsString()
  org_code?: string;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  // @IsObject()
  // location: {
  //   coordinates: [];
  // };
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
    name?: string;
    last_password_reset?: string;
    updated_at?: string;
  };
}
