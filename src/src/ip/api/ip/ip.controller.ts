import {
  BadRequestException,
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
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../application/command/create.order.command';
import { generateString } from '@nestjs/typeorm';
import { UserGuard } from '../../../../lib/authorization/src/user.guard';
import { UserId } from '../../../../lib/authorization/src/jwt/user-id.decorator';
import {
  BuyIp,
  DistributeFromUserPrefixDto,
  IpAssign,
  IpBuyInvoiceId,
  IpDeleteInvoiceId,
  IpFilter,
  SetReverseDns,
} from './ip.dto';
import { AssignRequestCommand } from '../../application/command/assign.request.command';
import { UnassignRequestCommand } from '../../application/command/unassign.request.command';
import { DeleteRequestCommand } from '../../application/command/delete.request.command';
import { FindUserIpListResult } from '../../application/query/find.ip.list.result';
import { FindUserIpListQuery } from '../../application/query/find.ip.list.query';
import { FindUserPrefixQuery } from '../../../prefix/application/query/find.user.prefix.query';
import { IpCreateCommand } from '../../application/command/ip.create.command';
import { FindUserPrefixResult } from '../../../prefix/application/query/find.user.prefix.result';
import { FindFreeAddressQuery } from '../../application/query/find.free.address.query';
import { FindFreeAddressResult } from '../../application/query/find.free.address.result';

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
    type: FindUserIpListResult,
  })
  async ipList(@UserId() userId: string, @Query() filter: IpFilter): Promise<FindUserIpListResult> {
    const query = new FindUserIpListQuery({ ...filter, userId: userId });
    const result: FindUserIpListResult = await this.queryBus.execute(query);
    return result;
  }

  @Patch(':id/reverse-dns')
  async ipSetReverseDns(@UserId() userId, @Param('id') id: string, @Body() data: SetReverseDns) {
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
  async ipAssign(@UserId() userId, @Param('id') id: string, @Body() body: IpAssign) {
    await this.commandBus.execute(new AssignRequestCommand(id, body.assignmentId, body.assignmentType, userId));
  }

  @Post(':id/deassign')
  async ipDeassign(@UserId() userId, @Param('id') id: string) {
    await this.commandBus.execute(new UnassignRequestCommand(id, userId));
  }

  @Get('/price')
  @ApiOkResponse({ type: String })
  async ipPrice() {
    return process.env.IP_PRICE;
  }

  @Get('/free/:prefixId')
  @ApiOkResponse({ type: String })
  async findFreeAddress(@UserId() userId, @Param('prefixId') prefixId: string): Promise<string> {
    const prefix: FindUserPrefixResult = await this.queryBus.execute(new FindUserPrefixQuery({ id: prefixId, userId }));
    if (!prefix) throw new BadRequestException('Prefix not found');
    const response: FindFreeAddressResult = await this.queryBus.execute(
      new FindFreeAddressQuery({ prefix: prefix.prefix, family: prefix.family, dataCenterName: prefix.dataCenterName }),
    );
    return response?.address || '';
  }

  @Post('/distribute')
  async distributeIp(@UserId() userId, @Body() dto: DistributeFromUserPrefixDto) {
    const prefix: FindUserPrefixResult = await this.queryBus.execute(
      new FindUserPrefixQuery({ id: dto.prefixId, userId }),
    );
    if (!prefix) throw new BadRequestException('Prefix not found');
    await this.commandBus.execute(
      new IpCreateCommand(
        generateString(),
        userId,
        prefix.dataCenterName,
        prefix.family,
        false,
        null,
        dto.assignmentId || null,
        dto.assignmentType || null,
        dto.address,
        prefix.prefix,
      ),
    );
  }
}
