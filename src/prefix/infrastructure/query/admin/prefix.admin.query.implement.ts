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
    const page = query.pagination.page || 1;
    const result = await readConnection.getRepository(PrefixEntity).find({
      where: {
        deleted: false,
        initialized: true,
        status: 'active',
        ...query.filter,
      },
      order: {
        status: 'DESC',
        createdAt: 'ASC',
      },
      skip: query.pagination.size ? query.pagination.size * (page - 1) : 0,
      take: query.pagination.size,
    });
    return {
      size: +result.length,
      page: +query.pagination.page || 1,
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
