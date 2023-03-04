import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindAdminPrefixListFilter, FindAdminPrefixListQuery } from '../application/query/admin/find.prefix.list.query';
import { FindAdminPrefixListResult } from '../application/query/admin/find.prefix.list.result';
import { BasePaginationClass } from '../../../lib/pagination/base.pagination.class';
import { PrefixAnnounceCommand } from '../application/command/prefix.announce.command';
import { PrefixUnblockCommand } from '../application/command/prefix.unblock.command';
import { PrefixBlockCommand } from '../application/command/prefix.block.command';
import { PrefixDeleteRequestCommand } from '../application/command/prefix.delete.request.command';

@Controller('/api/admin/ipam/prefix')
@ApiTags('AdminNetwork')
// @AdminGuard()
// @ApiBearerAuth()
export class PrefixAdminController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/announce/:id')
  async announce(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new PrefixAnnounceCommand(id));
  }

  @Post('/reject/:id')
  async reject(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new PrefixDeleteRequestCommand(id));
  }

  @Post('/block/:id')
  async block(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new PrefixBlockCommand(id));
  }

  @Post('/unblock/:id')
  async unblock(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new PrefixUnblockCommand(id));
  }

  @Get('/')
  @ApiOkResponse({ type: FindAdminPrefixListResult })
  async prefixes(
    @Query() filter: FindAdminPrefixListFilter,
    @Query() pagination: BasePaginationClass,
  ): Promise<FindAdminPrefixListResult> {
    return await this.queryBus.execute(new FindAdminPrefixListQuery({ filter, pagination }));
  }
}
