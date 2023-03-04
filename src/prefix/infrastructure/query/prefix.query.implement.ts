import { Injectable } from '@nestjs/common';
import { PrefixQuery } from '../../application/query/prefix.query';
import { readConnection } from '../../../../lib/db.module';
import { PrefixEntity } from '../prefix.entity';
import { FindUserPrefixListQuery } from '../../application/query/find.prefix.list.query';
import { FindUserPrefixListResult } from '../../application/query/find.prefix.list.result';
import { FindUserPrefixQuery } from '../../application/query/find.user.prefix.query';
import { FindUserPrefixResult } from '../../application/query/find.user.prefix.result';

@Injectable()
export class PrefixQueryImplement implements PrefixQuery {
  async findUserPrefix(query: FindUserPrefixQuery): Promise<FindUserPrefixResult> {
    const result = await readConnection.getRepository(PrefixEntity).findOne({
      where: {
        ...query,
        deleted: false,
        initialized: true,
        isBlocked: false,
      },
    });
    if (!result) return undefined;
    return {
      id: result.id,
      dataCenterName: result.dataCenter,
      prefix: result.prefix,
      family: result.version,
    };
  }

  async find(query: FindUserPrefixListQuery): Promise<FindUserPrefixListResult> {
    const result = await readConnection.getRepository(PrefixEntity).find({
      where: {
        deleted: false,
        initialized: true,
        isBlocked: false,
        status: 'active',
        userId: query.userId,
        ...(query.dataCenter && { dataCenter: query.dataCenter }),
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return {
      result: result.map(prefix => {
        return {
          id: prefix.id,
          prefix: prefix.prefix,
          dataCenterName: prefix.dataCenter,
        };
      }),
    };
  }
}
