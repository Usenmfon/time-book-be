import { IsDate, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateRecordDto {
  @IsOptional()
  user?: Types.ObjectId;

  @IsOptional()
  org?: Types.ObjectId;

  @IsOptional()
  @IsDate()
  time_in: Date;

  @IsOptional()
  @IsDate()
  time_out: Date;
}
