import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Record, RecordDocument } from './schema/record.schema';
import { Model, Types } from 'mongoose';
import { CreateRecordDto, UpdateRecordDto } from './dto';
import { ServiceException } from 'src/helper/exceptions/exceptions/service.layer.exception';
import { parseDBError } from 'src/helper/main';
import { Profile, ProfileDocument } from '../profile/schema/profile.schema';
import { Org, OrgDocument } from '../org/schema/org.schema';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name)
    private RecordSchema: Model<RecordDocument>,
    @InjectModel(Profile.name) private ProfileSchema: Model<ProfileDocument>,
    @InjectModel(Org.name) private OrgSchema: Model<OrgDocument>,
  ) {}

  async getRecord(id: Types.ObjectId) {
    // console.log(id)
    return this.RecordSchema.findOne({ user: id })
      .then(async (record) => {
        // console.log(record);
        if (!record) {
          throw new ServiceException({ error: 'Record profile not found' });
        }
        return record;
      })
      .catch((e) => {
        throw new ServiceException({ error: parseDBError(e) });
      });
  }

  async getAllRecords(id: Types.ObjectId) {
    return this.RecordSchema.find({ org: id })
      .then(async (record) => {
        if (!record) {
          throw new ServiceException({ error: 'Records not found' });
        }
        return record;
      })
      .catch((e) => {
        throw new ServiceException({ error: parseDBError(e) });
      });
  }

  async createRecord(id: Types.ObjectId, dto) {
    try {
      const user = await this.ProfileSchema.findById(id)
        .populate([{ path: 'org', select: ['latitude', 'longitude'] }])
        .catch((e) => {
          throw new ServiceException({ error: parseDBError(e) });
        });

      // const org = await this.OrgSchema.findById(a.org);
      if (
        user.org.latitude === dto.latitude &&
        user.org.longitude === dto.longitude
      ) {
        // console.log(user.org._id);
        dto.org = user.org;

        dto.sign_in = new Date();
        dto.user = id;
        const record = new this.RecordSchema({ ...dto });
        await record.save();

        return record;
      }
      throw new ServiceException({
        error: 'You are not currently in the organization',
      });
    } catch (e) {
      throw new ServiceException({ error: parseDBError(e) });
    }
  }

  async updateRecord(id: Types.ObjectId, dto: UpdateRecordDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    dto.user = id;
    dto.sign_out = new Date();

    return this.RecordSchema.findOneAndUpdate(
      {
        $and: [{ user: id }, { createdAt: { $gte: today, $lt: tomorrow } }],
      },
      dto,
    )
      .then(async (record) => {
        return record;
      })
      .catch((e) => {
        throw new ServiceException({ error: parseDBError(e) });
      });
  }
}
