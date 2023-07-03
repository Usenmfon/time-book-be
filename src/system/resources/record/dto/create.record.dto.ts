import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateRecordDto {
  @IsOptional()
  user?: Types.ObjectId;

  @IsOptional()
  org?: Types.ObjectId;

  @IsOptional()
  @IsDate()
  sign_in: Date;

  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsDate()
  sign_out: Date;
}
