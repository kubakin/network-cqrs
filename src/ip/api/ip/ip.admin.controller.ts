import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  FindAdminIpListFilter,
  FindAdminIpListQuery,
} from '../../application/query/admin/find.ip.list.query';
import { BasePaginationClass } from '../../../../lib/pagination/base.pagination.class';
import { FindAdminIpListResult } from '../../application/query/admin/find.ip.list.result';

@Controller('/api/admin/ipam/ip')
@ApiTags('AdminNetwork')
// @AdminGuard()
// @ApiBearerAuth()
export class IpAdminController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Get('/')
  @ApiOkResponse({ type: FindAdminIpListResult })
  async ips(
    @Query() filter: FindAdminIpListFilter,
    @Query() pagination: BasePaginationClass,
  ) {
    return await this.queryBus.execute(
      new FindAdminIpListQuery({ filter, pagination }),
    );
  }
}
