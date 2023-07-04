import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateProfileDto {
  @IsOptional()
  user?: Types.ObjectId;

  @IsOptional()
  org?: Types.ObjectId;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  org_code?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  dob?: string;
}
