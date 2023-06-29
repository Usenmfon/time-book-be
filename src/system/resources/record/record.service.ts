import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Record, RecordDocument } from './schema/record.schema';
import { Model, Types } from 'mongoose';
import { UpdateRecordDto } from './dto';
import { ServiceException } from 'src/helper/exceptions/exceptions/service.layer.exception';
import { parseDBError } from 'src/helper/main';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name)
    private RecordSchema: Model<RecordDocument>,
  ) {}

  async getRecord(id: Types.ObjectId) {
    return this.RecordSchema.findOne({ _id: id })
      .then(async (record) => {
        if (!record) {
          throw new ServiceException({ error: 'Record profile not found' });
        }
        return record;
      })
      .catch((e) => {
        throw new ServiceException({ error: parseDBError(e) });
      });
  }

  async updateRecord(id: Types.ObjectId, dto: UpdateRecordDto) {
    dto.user = id;
    return this.RecordSchema.findOneAndUpdate({ _id: id }, dto, {
      new: true,
      upsert: true,
    })
      .then(async (record) => {
        return record;
      })
      .catch((e) => {
        throw new ServiceException({ error: parseDBError(e) });
      });
  }
}
