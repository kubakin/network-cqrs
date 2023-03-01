import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  FindAdminPrefixListFilter,
  FindAdminPrefixListQuery,
} from '../application/query/admin/find.prefix.list.query';
import { FindAdminPrefixListResult } from '../application/query/admin/find.prefix.list.result';
import { BasePaginationClass } from '../../../lib/pagination/base.pagination.class';

@Controller('/api/admin/ipam/prefix')
@ApiTags('AdminNetwork')
// @AdminGuard()
// @ApiBearerAuth()
export class PrefixAdminController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/announce/:id')
  async announce(@Param('id') id: string): Promise<void> {}

  @Post('/reject/:id')
  async reject(@Param('id') id: string): Promise<void> {}

  @Post('/block/:id')
  async block(@Param('id') id: string): Promise<void> {}

  @Post('/unblock/:id')
  async unblock(@Param('id') id: string): Promise<void> {}

  @Get('/')
  @ApiOkResponse({ type: FindAdminPrefixListResult })
  async prefixes(
    @Query() filter: FindAdminPrefixListFilter,
    @Query() pagination: BasePaginationClass,
  ): Promise<FindAdminPrefixListResult> {
    return await this.queryBus.execute(
      new FindAdminPrefixListQuery({ filter, pagination }),
    );
  }
}
