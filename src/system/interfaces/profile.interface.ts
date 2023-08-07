import { Types } from 'mongoose';

export interface IOrganization {
  user?: Types.ObjectId;

  org_code?: string;

  longitude?: number;

  latitude?: number;

  name?: string;

  // location?: [number, number];
}
