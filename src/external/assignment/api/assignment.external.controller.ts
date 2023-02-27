import { Injectable } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CommandBus } from '@nestjs/cqrs';
import { generateString } from '@nestjs/typeorm';
import { IpCreateDto } from '../../../ip/api/ip/ip.dto';
import { IpCreateCommand } from '../../../ip/application/command/ip.create.command';

@Injectable()
export class AssignmentExternalController {
  constructor(private commandBus: CommandBus) {}

  @RabbitRPC({
    exchange: 'client',
    routingKey: 'rpc.network.ip',
    queue: 'rpc.network.ip',
    queueOptions: {
      messageTtl: 15000,
    },
  })
  async networkRpc(msg) {
    if (msg.subject === 'primary.ip.get-out') {
      const data: IpCreateDto = msg.payload;
      const result = await this.commandBus.execute(
        new IpCreateCommand(
          generateString(),
          data.userId,
          data.dataCenter,
          data.family,
          true,
          null,
        ),
      );
      return { data: result };
    } else if (msg.subject === 'customer.resource.check') {
      console.log(msg);
      return { data: true };
    }
  }
}
