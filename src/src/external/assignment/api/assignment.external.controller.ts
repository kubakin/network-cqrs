import { Injectable } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CommandBus } from '@nestjs/cqrs';
import { generateString } from '@nestjs/typeorm';
import { IpCreateCommand } from '../../../ip/application/command/ip.create.command';
import { AssignmentResetCommand } from '../../../ip/application/command/assignment.reset.command';

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
    if (msg.subject === 'ip.create') {
      const data: IpCreateCommand = msg.payload;
      const result = await this.commandBus.execute(
        new IpCreateCommand(
          generateString(),
          data.userId,
          data.dataCenter,
          data.family,
          data.primary,
          data.subscriptionId,
          data.assignmentId,
          data.assignmentType,
        ),
      );
      return { data: result };
    } else if (msg.subject === 'customer.resource.check') {
      return { data: true };
    } else if (msg.subject === 'customer.ip.reset') {
      await this.commandBus.execute(
        new AssignmentResetCommand(msg.payload.assignmentId as string),
      );
      return { data: true };
    }
  }
}
