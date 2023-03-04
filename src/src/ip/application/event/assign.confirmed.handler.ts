import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AssignConfirmedEvent } from '../../../external/assignment/event/assign.confirmed.event';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';

@EventsHandler(AssignConfirmedEvent)
export class AssignConfirmedHandler
  implements IEventHandler<AssignConfirmedEvent>
{
  @Inject(InjectionToken.IP_REPOSITORY) ipRepository: IpRepository;

  async handle(event: AssignConfirmedEvent): Promise<void> {
    const ip = await this.ipRepository.findById(event.id);
    ip.assignConfirmed();
    await this.ipRepository.save(ip);
  }
}
