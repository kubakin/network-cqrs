import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { IpUnassignConfirmed } from '../assignment.messages';
import { EventBus } from '@nestjs/cqrs';
import { UnassignConfirmedEvent } from './unassign.confirmed.event';

@Injectable()
export class UnassignConfirmedHandler {
  constructor(private eventBus: EventBus) {}

  @RabbitSubscribe({
    exchange: 'client',
    routingKey: ['ipam.event.ip.customer.unassign.confirmed'],
    queueOptions: {
      autoDelete: true,
    },
  })
  async confirmed(msg: any) {
    const data: IpUnassignConfirmed = msg.data;
    await this.eventBus.publish(
      new UnassignConfirmedEvent(data.id, data.address),
    );
  }
}
