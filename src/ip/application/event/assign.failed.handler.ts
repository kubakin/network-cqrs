import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AssignFailedEvent } from '../../../external/assignment/event/assign.failed.event';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';

@EventsHandler(AssignFailedEvent)
export class AssignFailedHandler implements IEventHandler<AssignFailedEvent> {
  @Inject(InjectionToken.IP_REPOSITORY) ipRepository: IpRepository;

  async handle(event: AssignFailedEvent): Promise<void> {
    const ip = await this.ipRepository.findById(event.id);
    ip.assignFailed();
    await this.ipRepository.save(ip);
  }
}
