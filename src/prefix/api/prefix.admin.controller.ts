import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post } from '@nestjs/common';
import { AnnounceInvoicesId } from './prefix.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AdminGuard } from '../../../lib/authorization/src/admin.guard';

@Controller('/api/admin/ipam/prefix')
@ApiTags('AdminNetwork')
@AdminGuard()
@ApiBearerAuth()
export class PrefixAdminController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/')
  @ApiOkResponse({ type: AnnounceInvoicesId })
  async announce(): Promise<void> {}

  @Get('/')
  async prefixes() {}
}
