import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdminPrefixQuery } from './prefix.query';
import { FindAdminPrefixListResult } from './find.prefix.list.result';
import { FindAdminPrefixListQuery } from './find.prefix.list.query';
import { InjectionToken } from '../../injection.token';

@QueryHandler(FindAdminPrefixListQuery)
export class FindAdminPrefixListHandler
  implements IQueryHandler<FindAdminPrefixListQuery, FindAdminPrefixListResult>
{
  @Inject(InjectionToken.ADMIN_PREFIX_QUERY) prefixQuery: AdminPrefixQuery;

  async execute(
    query: FindAdminPrefixListQuery,
  ): Promise<FindAdminPrefixListResult> {
    return this.prefixQuery.find(query);
  }
}
