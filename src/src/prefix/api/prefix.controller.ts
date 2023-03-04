import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserGuard } from '../../../lib/authorization/src/user.guard';
import { UserId } from '../../../lib/authorization/src/jwt/user-id.decorator';
import { AnnounceInvoicesId, AnnouncePrefix } from './prefix.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PrefixCreateCommand } from '../application/command/prefix.create.command';
import { FindUserPrefixListResult } from '../application/query/find.prefix.list.result';
import { FindUserPrefixListQuery } from '../application/query/find.prefix.list.query';

@Controller('/api/ipam/prefix')
@ApiTags('network')
@UserGuard()
@ApiBearerAuth()
export class PrefixController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/')
  @ApiOkResponse({ type: AnnounceInvoicesId })
  async announceRequest(@UserId() userId: string, @Body() body: AnnouncePrefix): Promise<AnnounceInvoicesId> {
    const invoices = await this.commandBus.execute(
      new PrefixCreateCommand(body.prefixes, body.asNumber, body.version, userId, body.dataCenterName),
    );
    return {
      invoices: invoices,
    };
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindUserPrefixListResult,
  })
  async userPrefixes(@UserId() userId: string): Promise<FindUserPrefixListResult> {
    const query = new FindUserPrefixListQuery({
      userId,
    });
    const result: FindUserPrefixListResult = await this.queryBus.execute(query);
    return result;
  }
}
