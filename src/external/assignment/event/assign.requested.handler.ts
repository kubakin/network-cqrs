import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AssignRequestedEvent } from '../../../ip/domain/event/assign.requested.event';

@EventsHandler(AssignRequestedEvent)
export class AssignRequestedHandler
  implements IEventHandler<AssignRequestedEvent>
{
  route: string;

  constructor(private amqpConnection: AmqpConnection) {
    this.route = 'ipam.event.ip.customer.assign.requested';
  }

  async handle(event: AssignRequestedEvent): Promise<void> {
    await this.amqpConnection.publish('client', this.route, {
      name: this.route,
      data: event,
    });
  }
}
