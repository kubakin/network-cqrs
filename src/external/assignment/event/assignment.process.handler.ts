import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  IpAssignConfirmed,
  IpAssignFailed,
  IpUnassignConfirmed,
  IpUnassignFailed,
} from '../assignment.messages';
import { EventBus } from '@nestjs/cqrs';
import { AssignConfirmedEvent } from './assign.confirmed.event';
import { AssignFailedEvent } from './assign.failed.event';
import { UnassignConfirmedEvent } from './unassign.confirmed.event';
import { UnassignFailedEvent } from './unassign.failed.event';

@Injectable()
export class AssignmentProcessHandler {
  constructor(private eventBus: EventBus) {}

  @RabbitSubscribe({
    exchange: 'client',
    routingKey: ['ipam.event.ip.customer.*.*'],
    queue: 'network_assignment',
    queueOptions: {
      autoDelete: true,
    },
  })
  async assignmentProcess(msg: any) {
    if (msg.name === 'ipam.event.ip.customer.assign.confirmed') {
      const data: IpAssignConfirmed = msg.data;
      await this.eventBus.publish(
        new AssignConfirmedEvent(data.id, data.address),
      );
    } else if (msg.name === 'ipam.event.ip.customer.assign.failed') {
      const data: IpAssignFailed = msg.data;
      await this.eventBus.publish(new AssignFailedEvent(data.id));
    } else if (msg.name === 'ipam.event.ip.customer.unassign.confirmed') {
      const data: IpUnassignConfirmed = msg.data;
      await this.eventBus.publish(
        new UnassignConfirmedEvent(data.id, data.address),
      );
    } else if (msg.name === 'ipam.event.ip.customer.unassign.failed') {
      const data: IpUnassignFailed = msg.data;
      await this.eventBus.publish(new UnassignFailedEvent(data.id));
    }
  }
}
