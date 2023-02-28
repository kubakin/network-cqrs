import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindIpListQuery } from './find.ip.list.query';
import { FindIpListResult } from './find.ip.list.result';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpQuery } from './ip.query';

@QueryHandler(FindIpListQuery)
export class FindIpListHandler implements IQueryHandler<FindIpListQuery> {
  @Inject(InjectionToken.IP_QUERY) ipQuery: IpQuery;

  async execute(query: FindIpListQuery): Promise<FindIpListResult> {
    return this.ipQuery.find(query);
  }
}
