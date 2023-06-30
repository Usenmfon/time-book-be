import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateRecordDto {
  @IsOptional()
  user?: Types.ObjectId;

  @IsOptional()
  org?: Types.ObjectId;

  @IsOptional()
  @IsDate()
  sign_in: Date;

  @IsOptional()
  @IsDate()
  sign_out: Date;
}
