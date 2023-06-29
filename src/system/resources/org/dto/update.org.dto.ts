import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateOrgDto {
  @IsNotEmpty()
  user?: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  org_code: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
