import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  SubscriptionActivated,
  SubscriptionCanceled,
} from '../subscription.messages';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { SubscriptionActivatedEvent } from '../event/subscription.activated.event';
import { SubscriptionCanceledEvent } from '../event/subscription.canceled.event';

@Injectable()
export class SubscriptionExternalService {
  constructor(private eventBus: EventBus, private commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: 'client',
    routingKey: ['balance.event.subscription.*'],
    queueOptions: {
      autoDelete: true,
    },
  })
  public async pubSubHandler(msg: any, data) {
    if (msg.name === 'balance.event.subscription.activated') {
      const subscriptionActivated: SubscriptionActivated = msg.data;
      await this.eventBus.publish(
        new SubscriptionActivatedEvent(subscriptionActivated.id),
      );
    } else if (msg.name === 'balance.event.subscription.canceled') {
      const subscriptionCanceled: SubscriptionCanceled = msg.data;
      await this.eventBus.publish(
        new SubscriptionCanceledEvent(subscriptionCanceled.id),
      );
    }
  }
}
