import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { IpAssignFailed } from '../assignment.messages';
import { EventBus } from '@nestjs/cqrs';
import { UnassignFailedEvent } from './unassign.failed.event';

@Injectable()
export class UnassignFailedHandler {
  constructor(private eventBus: EventBus) {}

  @RabbitSubscribe({
    exchange: 'client',
    routingKey: ['ipam.event.ip.customer.unassign.failed'],
    queue: 'network_assignment',
    queueOptions: {
      autoDelete: true,
    },
  })
  async failed(msg: any) {
    const data: IpAssignFailed = msg.data;
    await this.eventBus.publish(new UnassignFailedEvent(data.id));
  }
}
