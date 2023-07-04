import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateOrgDto {
  @IsOptional()
  user?: Types.ObjectId;

  @IsOptional()
  @IsString()
  org_code: string;

  @IsOptional()
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  location: string;
}
