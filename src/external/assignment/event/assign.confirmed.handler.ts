import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { IpAssignConfirmed } from '../assignment.messages';
import { EventBus } from '@nestjs/cqrs';
import { AssignConfirmedEvent } from './assign.confirmed.event';

@Injectable()
export class AssignConfirmedHandler {
  constructor(private eventBus: EventBus) {}

  @RabbitSubscribe({
    exchange: 'client',
    routingKey: ['ipam.event.ip.customer.assign.confirmed'],
    queueOptions: {
      autoDelete: true,
    },
  })
  async confirmed(msg: any) {
    const data: IpAssignConfirmed = msg.data;
    await this.eventBus.publish(
      new AssignConfirmedEvent(data.id, data.address),
    );
  }
}
