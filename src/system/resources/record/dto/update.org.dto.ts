import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateRecordDto {
  @IsNotEmpty()
  user?: Types.ObjectId;

  @IsNotEmpty()
  org?: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  sign_in: string;

  @IsNotEmpty()
  @IsString()
  sign_out: string;
}
