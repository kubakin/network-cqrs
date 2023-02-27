import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UnassignFailedEvent } from '../../../external/assignment/event/unassign.failed.event';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';

@EventsHandler(UnassignFailedEvent)
export class UnassignFailedHandler
  implements IEventHandler<UnassignFailedEvent>
{
  @Inject(InjectionToken.IP_REPOSITORY) ipRepository: IpRepository;

  async handle(event: UnassignFailedEvent): Promise<void> {
    const ip = await this.ipRepository.findById(event.id);
    ip.unassignFailed();
    await this.ipRepository.save(ip);
  }
}
