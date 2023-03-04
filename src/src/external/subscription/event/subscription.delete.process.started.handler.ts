import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { SubscriptionDeleteProcessStartedEvent } from '../../../ip/domain/event/subscription.delete.process.started.event';

@EventsHandler(SubscriptionDeleteProcessStartedEvent)
export class SubscriptionDeleteProcessStartedHandler
  implements IEventHandler<SubscriptionDeleteProcessStartedEvent>
{
  route: string;

  constructor(private amqpConnection: AmqpConnection) {
    this.route = 'balance.command.subscription.cancel';
  }

  handle(event: SubscriptionDeleteProcessStartedEvent): Promise<any> {
    return this.amqpConnection.publish('client', this.route, {
      name: this.route,
      data: event.cancel,
    });
  }
}
