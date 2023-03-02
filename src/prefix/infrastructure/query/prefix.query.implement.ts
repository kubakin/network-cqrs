import { Injectable } from '@nestjs/common';
import { PrefixQuery } from '../../application/query/prefix.query';
import { readConnection } from '../../../../lib/db.module';
import { PrefixEntity } from '../prefix.entity';
import { FindUserPrefixListQuery } from '../../application/query/find.prefix.list.query';
import { FindUserPrefixListResult } from '../../application/query/find.prefix.list.result';

@Injectable()
export class PrefixQueryImplement implements PrefixQuery {
  async find(
    query: FindUserPrefixListQuery,
  ): Promise<FindUserPrefixListResult> {
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
      result: result.map((prefix) => {
        return {
          id: prefix.id,
          prefix: prefix.prefix,
          dataCenterName: prefix.dataCenter,
        };
      }),
    };
  }
}
