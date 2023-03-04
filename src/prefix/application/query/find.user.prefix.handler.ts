import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { PrefixQuery } from './prefix.query';
import { FindUserPrefixQuery } from './find.user.prefix.query';
import { FindUserPrefixResult } from './find.user.prefix.result';

@QueryHandler(FindUserPrefixQuery)
export class FindUserPrefixHandler implements IQueryHandler<FindUserPrefixQuery, FindUserPrefixResult> {
  @Inject(InjectionToken.PREFIX_QUERY) prefixQuery: PrefixQuery;

  async execute(query: FindUserPrefixQuery): Promise<FindUserPrefixResult> {
    return this.prefixQuery.findUserPrefix(query);
  }
}
