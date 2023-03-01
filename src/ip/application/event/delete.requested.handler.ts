import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { DeleteRequestedEvent } from '../../domain/event/delete.requested.event';
import { NetboxService } from '../../infrastructure/integration/netbox.service';

@EventsHandler(DeleteRequestedEvent)
export class DeleteRequestedHandler
  implements IEventHandler<DeleteRequestedEvent>
{
  @Inject(InjectionToken.IP_REPOSITORY) ipRepository: IpRepository;

  constructor(private dcimService: NetboxService) {}

  async handle(event: DeleteRequestedEvent): Promise<void> {
    const ip = await this.ipRepository.findById(event.id);
    await this.dcimService.deleteByInstance(ip.getId());
    ip.deleteConfirmed();
    await this.ipRepository.save(ip);
  }
}
