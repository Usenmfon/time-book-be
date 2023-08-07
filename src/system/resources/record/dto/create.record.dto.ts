import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRecordDto {
  @IsOptional()
  user?: Types.ObjectId;

  @IsOptional()
  org?: Types.ObjectId;

  @IsOptional()
  @IsDate()
  time_in: Date;

  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsDate()
  time_out: Date;
}
