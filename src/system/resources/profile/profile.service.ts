import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './schema/profile.schema';
import { Model, Types } from 'mongoose';
import { UpdateProfileDto } from './dto';
import { ServiceException } from 'src/helper/exceptions/exceptions/service.layer.exception';
import { parseDBError } from 'src/helper/main';
import { Org, OrgDocument } from '../org/schema/org.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private ProfileSchema: Model<ProfileDocument>,
    @InjectModel(Org.name) private OrgSchema: Model<OrgDocument>,
  ) {}

  async getProfile(id: Types.ObjectId) {
    return this.ProfileSchema.findOne({ _id: id })
      .then(async (user) => {
        if (!user) {
          throw new ServiceException({ error: 'User profile not found' });
        }
        return user;
      })
      .catch((e) => {
        throw new ServiceException({ error: parseDBError(e) });
      });
  }

  async updateProfile(id: Types.ObjectId, dto: UpdateProfileDto) {
    await this.OrgSchema.findOne({ org_code: dto.org_code }).then(
      async (user) => {
        if (!user) {
          throw new ServiceException({ error: 'organization not found' });
        }
        dto.org = user._id;
      },
    );

    dto.user = id;

    return this.ProfileSchema.findOneAndUpdate({ _id: id }, dto, {
      new: true,
      upsert: true,
    })
      .then(async (user) => {
        return user;
      })
      .catch((e) => {
        throw new ServiceException({ error: parseDBError(e) });
      });
  }
}
