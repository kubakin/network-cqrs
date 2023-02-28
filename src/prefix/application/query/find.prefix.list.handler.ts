import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { FindUserPrefixListQuery } from './find.prefix.list.query';
import { PrefixQuery } from './prefix.query';
import { FindUserPrefixListResult } from './find.prefix.list.result';

@QueryHandler(FindUserPrefixListQuery)
export class FindUserPrefixListHandler
  implements IQueryHandler<FindUserPrefixListQuery, FindUserPrefixListResult>
{
  @Inject(InjectionToken.PREFIX_QUERY) prefixQuery: PrefixQuery;

  async execute(
    query: FindUserPrefixListQuery,
  ): Promise<FindUserPrefixListResult> {
    return this.prefixQuery.find(query);
  }
}
