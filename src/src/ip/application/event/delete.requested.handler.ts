import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { DeleteRequestedEvent } from '../../domain/event/delete.requested.event';
import { NetboxService } from '../../infrastructure/integration/netbox.service';
import { RedisLockService } from '@huangang/nestjs-simple-redis-lock';
import { RedisLock } from '@huangang/nestjs-simple-redis-lock/index';

@EventsHandler(DeleteRequestedEvent)
export class DeleteRequestedHandler implements IEventHandler<DeleteRequestedEvent> {
  @Inject(InjectionToken.IP_REPOSITORY) ipRepository: IpRepository;

  constructor(private dcimService: NetboxService, protected lockService: RedisLockService) {}

  @RedisLock((target, param: DeleteRequestedEvent) => `IP[${param.id}][deleting]`)
  async handle(event: DeleteRequestedEvent): Promise<void> {
    const ip = await this.ipRepository.findById(event.id);
    if (!ip) return;
    await this.dcimService.deleteByInstance(event.id);
    ip.deleteConfirmed();
    await this.ipRepository.save(ip);
  }
}
