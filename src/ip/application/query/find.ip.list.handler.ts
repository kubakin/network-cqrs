import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { UserIpQuery } from './ip.query';
import { FindUserIpListQuery } from './find.ip.list.query';
import { FindUserIpListResult } from './find.ip.list.result';

@QueryHandler(FindUserIpListQuery)
export class FindUserIpListHandler
  implements IQueryHandler<FindUserIpListQuery>
{
  @Inject(InjectionToken.IP_QUERY) ipQuery: UserIpQuery;

  async execute(query: FindUserIpListQuery): Promise<FindUserIpListResult> {
    return this.ipQuery.find(query);
  }
}
