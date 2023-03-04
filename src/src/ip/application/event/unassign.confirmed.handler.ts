import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UnassignConfirmedEvent } from '../../../external/assignment/event/unassign.confirmed.event';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';

@EventsHandler(UnassignConfirmedEvent)
export class UnassignConfirmedHandler
  implements IEventHandler<UnassignConfirmedEvent>
{
  @Inject(InjectionToken.IP_REPOSITORY) ipRepository: IpRepository;

  async handle(event: UnassignConfirmedEvent): Promise<void> {
    const ip = await this.ipRepository.findById(event.id);
    ip.unassignConfirmed();
    await this.ipRepository.save(ip);
  }
}
