import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../application/command/create.order.command';
import { generateString } from '@nestjs/typeorm';
import { FindIpListQuery } from '../../application/query/find.ip.list.query';
import { FindIpListResult } from '../../application/query/find.ip.list.result';
import { UserGuard } from '../../../../lib/authorization/src/user.guard';
import { UserId } from '../../../../lib/authorization/src/jwt/user-id.decorator';
import {
  BuyIp,
  IpAssign,
  IpBuyInvoiceId,
  IpDeleteInvoiceId,
  IpFilter,
  SetReverseDns,
} from './ip.dto';
import { AssignRequestCommand } from '../../application/command/assign.request.command';
import { UnassignRequestCommand } from '../../application/command/unassign.request.command';
import { DeleteRequestCommand } from '../../application/command/delete.request.command';

@Controller('/api/ipam/ip')
@ApiTags('network')
@UserGuard()
@ApiBearerAuth()
export class IpController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post('/')
  @ApiOkResponse({ type: IpBuyInvoiceId })
  async ipBuy(@UserId() userId, @Body() body: BuyIp): Promise<IpBuyInvoiceId> {
    const invoiceId = generateString();
    const command = new CreateOrderCommand(
      generateString(),
      body.version,
      body.dataCenterName,
      invoiceId,
      false,
      userId,
      body.dedicId,
      body.vdsId,
    );
    await this.commandBus.execute(command);
    return {
      value: invoiceId,
    };
  }

  @Get('network-dc')
  async dcList() {
    return [];
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindIpListResult,
  })
  async ipList(@UserId() userId: string, @Query() filter: IpFilter) {
    const query = new FindIpListQuery({ ...filter, userId: userId });
    const result: any = await this.queryBus.execute(query);
    return result.result;
  }

  @Patch(':id/reverse-dns')
  async ipSetReverseDns(
    @UserId() userId,
    @Param('id') id: string,
    @Body() data: SetReverseDns,
  ) {
    // await this.commandBus.handle(
    //     Messages.build(IpUpdateReverseDns, {
    //       id,
    //       value: data.reverseDns,
    //     }),
    // );
  }

  @Delete(':id')
  @ApiOkResponse({ type: IpDeleteInvoiceId })
  async ipDelete(@UserId() userId, @Param('id') id: string) {
    return await this.commandBus.execute(new DeleteRequestCommand(id, userId));
  }

  @Post(':id/assign')
  async ipAssign(
    @UserId() userId,
    @Param('id') id: string,
    @Body() body: IpAssign,
  ) {
    await this.commandBus.execute(
      new AssignRequestCommand(
        id,
        body.assignmentId,
        body.assignmentType,
        userId,
      ),
    );
  }

  @Post(':id/deassign')
  async ipDeassign(@UserId() userId, @Param('id') id: string) {
    await this.commandBus.execute(new UnassignRequestCommand(id, userId));
  }

  @Get('/price')
  async ipPrice() {
    return '150';
  }

  @Get('/free/:prefixId')
  async freeAddressFromPrefix(@Param('prefixId') prefixId: string) {}

  @Post('/get-out/:prefixId')
  async getOutFromPrefix(@Param('prefixId') prefixId: string) {}
}
