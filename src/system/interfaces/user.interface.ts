import { Types } from 'mongoose';

export interface IUser {
  email: string;
  fullname?: string;
  avatar?: string;
  type: number;
  id?: Types.ObjectId;
}
