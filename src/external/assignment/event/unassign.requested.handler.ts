import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UnnassignRequestedEvent } from '../../../ip/domain/event/unassign.requested.event';

@EventsHandler(UnnassignRequestedEvent)
export class UnassignRequestedHandler
  implements IEventHandler<UnnassignRequestedEvent>
{
  route: string;

  constructor(private amqpConnection: AmqpConnection) {
    this.route = 'ipam.event.ip.customer.unassign.requested';
  }

  async handle(event: UnnassignRequestedEvent): Promise<void> {
    await this.amqpConnection.publish('client', this.route, {
      name: this.route,
      data: event,
    });
  }
}
