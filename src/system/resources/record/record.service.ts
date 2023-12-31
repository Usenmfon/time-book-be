import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Record, RecordDocument } from './schema/record.schema';
import { Model, Types } from 'mongoose';
import { UpdateRecordDto } from './dto';
import { ServiceException } from 'src/helper/exceptions/exceptions/service.layer.exception';
import { getStartAndEndOfWeek, parseDBError } from 'src/helper/main';
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

  // For users
  async getRecord(id: Types.ObjectId) {
    const today = new Date();
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(today);

    const timeInCount = await this.RecordSchema.find({
      $and: [
        { user: id },
        { createdAt: { $gte: startOfWeek, $lt: endOfWeek } },
      ],
    }).countDocuments();

    // const l = await this.RecordSchema.aggregate([
    //   {
    //     $match: {
    //       // user: id,
    //       createdAt: { $gte: startOfWeek, $lt: endOfWeek },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       timeInCount: { $sum: '$time_in' },
    //     },
    //   },
    // ]);

    // console.log(l);

    const timeOutCount = await this.RecordSchema.find({
      $and: [
        { user: id },
        { createdAt: { $gte: startOfWeek, $lt: endOfWeek } },
        { time_out: { $exists: true } },
      ],
    }).countDocuments();

    const count = {
      numberOfTimeIns: timeInCount,
      numberOfTimeOuts: timeOutCount,
    };
    return this.RecordSchema.find({ user: id })
      .sort({ createdAt: -1 })
      .then(async (record) => {
        if (!record) {
          throw new ServiceException({ error: 'Record not found' });
        }

        return [record, count];
      })
      .catch((e) => {
        throw new ServiceException({ error: parseDBError(e) });
      });
  }

  async getAllRecords(id: Types.ObjectId) {
    return this.RecordSchema.find({ org: id })
      .populate([{ path: 'user', select: ['name'] }])
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

  async getAnalysis(id: Types.ObjectId) {
    try {
      const code = await this.OrgSchema.findById(id);

      const users = await this.ProfileSchema.find({ org: id }).countDocuments();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const usersRecorded = await this.RecordSchema.find({
        $and: [{ org: id }, { createdAt: { $gte: today, $lt: tomorrow } }],
      }).countDocuments();

      const data = {
        totalUsers: users,
        recordedToday: usersRecorded,
        code: code.org_code,
      };
      return data;
    } catch (e) {
      throw new ServiceException({ error: parseDBError(e) });
    }
  }

  async createRecord(id: Types.ObjectId, dto) {
    try {
      const user = await this.ProfileSchema.findById(id)
        .populate([{ path: 'org', select: ['location'] }])
        .catch((e) => {
          throw new ServiceException({ error: parseDBError(e) });
        });

      const location = await this.OrgSchema.find({
        location: {
          $near: {
            $maxDistance: 5000,
            $geometry: {
              type: 'Point',
              coordinates: [dto.longitude, dto.latitude],
            },
          },
        },
      });

      if (location.length) {
        dto.org = user.org;

        dto.time_in = new Date();

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
    dto.time_out = new Date();

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
