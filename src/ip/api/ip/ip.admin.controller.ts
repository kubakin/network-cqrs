import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindAdminIpListFilter, FindAdminIpListQuery } from '../../application/query/admin/find.ip.list.query';
import { BasePaginationClass } from '../../../../lib/pagination/base.pagination.class';
import { FindAdminIpListResult } from '../../application/query/admin/find.ip.list.result';
import { IpBuyAdmin, IpBuyInvoiceId, IpDeleteInvoiceId } from './ip.dto';
import { generateString } from '@nestjs/typeorm';
import { CreateOrderCommand } from '../../application/command/create.order.command';
import { AdminId } from '../../../../lib/authorization/src/jwt/admin-id.decorator';
import { DeleteRequestCommand } from '../../application/command/delete.request.command';

@Controller('/api/admin/ipam/ip')
@ApiTags('AdminNetwork')
// @AdminGuard()
// @ApiBearerAuth()
export class IpAdminController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post('/')
  @ApiOkResponse({ type: IpBuyInvoiceId })
  async ipBuyAdmin(@AdminId() adminId: string, @Body() body: IpBuyAdmin): Promise<IpBuyInvoiceId> {
    const invoiceId = generateString();
    const command = new CreateOrderCommand(
      generateString(),
      body.version,
      body.dataCenterName,
      invoiceId,
      body.userId,
      body.dedicId,
      body.vdsId,
      body.address,
      body.prefix,
    );
    await this.commandBus.execute(command);
    return {
      value: invoiceId,
    };
  }

  @Delete(':id')
  @ApiOkResponse({ type: IpDeleteInvoiceId })
  async ipDeleteAdmin(@AdminId() adminId: string, @Param('id') id: string) {
    return await this.commandBus.execute(new DeleteRequestCommand(id));
  }

  @Get('/')
  @ApiOkResponse({ type: FindAdminIpListResult })
  async ips(@Query() filter: FindAdminIpListFilter, @Query() pagination: BasePaginationClass) {
    return await this.queryBus.execute(new FindAdminIpListQuery({ filter, pagination }));
  }
}
