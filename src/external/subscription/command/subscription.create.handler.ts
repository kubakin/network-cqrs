import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubscriptionCreateCommand } from './subscription.create.command';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@CommandHandler(SubscriptionCreateCommand)
export class SubscriptionCreateHandler
  implements ICommandHandler<SubscriptionCreateCommand>
{
  route: string;

  constructor(private amqpConnection: AmqpConnection) {
    this.route = 'balance.command.subscription.create';
  }

  execute(command: SubscriptionCreateCommand): Promise<any> {
    console.log('before publish');
    return this.amqpConnection.publish('client', this.route, {
      name: this.route,
      data: command.create,
    });
  }
}
