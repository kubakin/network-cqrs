import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { generateString } from '@nestjs/typeorm';
import { UserGuard } from '../../../lib/authorization/src/user.guard';
import { UserId } from '../../../lib/authorization/src/jwt/user-id.decorator';
import { AnnounceInvoicesId, AnnouncePrefix } from './prefix.dto';

@Controller('/api/ipam/prefix')
@ApiTags('network')
@UserGuard()
@ApiBearerAuth()
export class PrefixController {
  @Post('/')
  @ApiOkResponse({ type: AnnounceInvoicesId })
  async prefixAnnounce(
    @UserId() userId: string,
    @Body() body: AnnouncePrefix,
  ): Promise<AnnounceInvoicesId> {
    const invoiceId = generateString();
    return {
      invoices: [invoiceId],
    };
  }

  @Get()
  // @ApiOkResponse({ type: any, isArray: true })
  async prefixes(@UserId() userId: string) {
    return [];
  }
}
