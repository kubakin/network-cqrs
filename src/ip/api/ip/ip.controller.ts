import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../application/command/create.order.command';
import { generateString } from '@nestjs/typeorm';
import { FindIpListQuery } from '../../application/query/find.ip.list.query';
import { FindIpListResult } from '../../application/query/find.ip.list.result';
import { UserGuard } from '../../../../lib/authorization/src/user.guard';
import { UserId } from '../../../../lib/authorization/src/jwt/user-id.decorator';

@Controller('/api/ipam/ip')
@ApiTags('network')
@UserGuard()
@ApiBearerAuth()
export class IpController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post('/')
  async ipBuy(@UserId() userId: string) {
    const invoiceId = generateString();
    const command = new CreateOrderCommand(
      generateString(),
      4,
      'RETN',
      invoiceId,
      false,
      userId,
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
  async ipList() {
    const query = new FindIpListQuery({});
    const result: any = await this.queryBus.execute(query);
    return result.result;
  }

  @Delete(':id')
  async ipDelete(@Param('id') id: string) {}

  @Post(':id/assign')
  async ipAssign(@Param('id') id: string) {}

  @Post(':id/deassign')
  async ipDeassign(@Param('id') id: string) {}

  @Get('/price')
  async ipPrice() {
    return '150';
  }

  @Get('/free/:prefixId')
  async freeAddressFromPrefix(@Param('prefixId') prefixId: string) {}

  @Post('/get-out/:prefixId')
  async getOutFromPrefix(@Param('prefixId') prefixId: string) {}
}
