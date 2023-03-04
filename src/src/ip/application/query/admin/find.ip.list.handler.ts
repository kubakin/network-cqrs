import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdminIpQuery } from './ip.query';
import { FindAdminIpListQuery } from './find.ip.list.query';
import { FindAdminIpListResult } from './find.ip.list.result';
import { InjectionToken } from '../../injection.token';

@QueryHandler(FindAdminIpListQuery)
export class FindAdminIpListHandler
  implements IQueryHandler<FindAdminIpListQuery>
{
  @Inject(InjectionToken.ADMIN_IP_QUERY) ipQuery: AdminIpQuery;

  async execute(query: FindAdminIpListQuery): Promise<FindAdminIpListResult> {
    return this.ipQuery.find(query);
  }
}
