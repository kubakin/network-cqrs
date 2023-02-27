import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { IpAssignFailed } from '../assignment.messages';
import { EventBus } from '@nestjs/cqrs';
import { AssignFailedEvent } from './assign.failed.event';

@Injectable()
export class AssignFailedHandler {
  constructor(private eventBus: EventBus) {}

  @RabbitSubscribe({
    exchange: 'client',
    routingKey: ['ipam.event.ip.customer.assign.failed'],
    queueOptions: {
      autoDelete: true,
    },
  })
  async failed(msg: any) {
    const data: IpAssignFailed = msg.data;
    await this.eventBus.publish(new AssignFailedEvent(data.id));
  }
}
