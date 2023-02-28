import { Injectable } from '@nestjs/common';
import { AdminPrefixQuery } from '../../../application/query/admin/prefix.query';
import { FindAdminPrefixListQuery } from '../../../application/query/admin/find.prefix.list.query';
import { FindAdminPrefixListResult } from '../../../application/query/admin/find.prefix.list.result';
import { readConnection } from '../../../../../lib/db.module';
import { PrefixEntity } from '../../prefix.entity';

@Injectable()
export class PrefixAdminQueryImplement implements AdminPrefixQuery {
  async find(
    query: FindAdminPrefixListQuery,
  ): Promise<FindAdminPrefixListResult> {
    const result = await readConnection.getRepository(PrefixEntity).find({
      where: {
        deleted: false,
        initialized: true,
        status: 'active',
        ...query,
      },
      order: {
        status: 'DESC',
        createdAt: 'ASC',
      },
    });
    return {
      result: result.map((prefix) => {
        return {
          id: prefix.id,
          prefix: prefix.prefix,
          dataCenterName: prefix.dataCenter,
          subscriptionId: prefix.subscriptionId,
          status: prefix.status,
          as: prefix.as,
          userId: prefix.userId,
          isBlocked: prefix.isBlocked,
        };
      }),
    };
  }
}
