import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateOrgDto {
  @IsOptional()
  user?: Types.ObjectId;

  @IsOptional()
  @IsString()
  org_code: string;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsObject()
  @IsOptional()
  location?: {
    type: string;
    coordinates: [number, number];
  };
}
