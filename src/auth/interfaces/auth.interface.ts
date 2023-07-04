import { Types } from 'mongoose';

export interface IAuthUser {
  token?: string;
  email?: string;
  name?: string;
  type?: number;
  id?: Types.ObjectId;
}
