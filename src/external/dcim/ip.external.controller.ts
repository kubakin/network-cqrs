import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { CommandBus, EventBus } from '@nestjs/cqrs';
import { IpCreated, IpDeleted } from './ip.external.messages';

@Injectable()
export class IpExternalController {
  constructor(private eventBus: EventBus, private commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: 'client',
    routingKey: ['netbox-sync.event.ip.*'],
    queue: '',
  })
  public async pubSubHandler(msg: any) {
    if (msg.name === 'netbox-sync.event.ip.created') {
      const ipCreated: IpCreated = msg.data;
    } else if (msg.name === 'netbox-sync.event.ip.deleted') {
      const ipDeleted: IpDeleted = msg.data;
    }
  }
}
