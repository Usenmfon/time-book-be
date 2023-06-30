import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateOrgDto {
  @IsOptional()
  user?: Types.ObjectId;

  @IsOptional()
  @IsString()
  org_code: string;

  @IsOptional()
  @IsString()
  longitude: string;

  @IsOptional()
  @IsString()
  latitude: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  location: string;
}
