import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { SubscriptionCancelCommand } from './subscription.cancel.command';

@CommandHandler(SubscriptionCancelCommand)
export class SubscriptionCancelHandler
  implements ICommandHandler<SubscriptionCancelCommand>
{
  route: string;

  constructor(private amqpConnection: AmqpConnection) {
    this.route = 'balance.command.subscription.cancel';
  }

  execute(command: SubscriptionCancelCommand): Promise<any> {
    return this.amqpConnection.publish('client', this.route, {
      name: this.route,
      data: command.cancel,
    });
  }
}
