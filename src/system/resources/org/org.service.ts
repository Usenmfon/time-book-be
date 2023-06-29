import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Org, OrgDocument } from './schema/org.schema';
import { Model, Types } from 'mongoose';
import { UpdateOrgDto } from './dto';
import { ServiceException } from 'src/helper/exceptions/exceptions/service.layer.exception';
import { parseDBError } from 'src/helper/main';

@Injectable()
export class OrgService {
  constructor(
    @InjectModel(Org.name)
    private OrgSchema: Model<OrgDocument>,
  ) {}

  async getOrg(id: Types.ObjectId) {
    return this.OrgSchema.findOne({ _id: id })
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

  async updateOrg(id: Types.ObjectId, dto: UpdateOrgDto) {
    dto.user = id;
    return this.OrgSchema.findOneAndUpdate({ _id: id }, dto, {
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
