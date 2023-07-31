import { Types } from 'mongoose';

export interface IUser {
  email?: string;
  name?: string;
  avatar?: string;
  type?: number;
  id?: Types.ObjectId;
  code?: string;
}
