import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { SubscriptionCanceledEvent } from '../../../external/subscription/event/subscription.canceled.event';

@EventsHandler(SubscriptionCanceledEvent)
export class SubscriptionCanceledHandler
  implements IEventHandler<SubscriptionCanceledEvent>
{
  @Inject(InjectionToken.IP_REPOSITORY) ipRepository: IpRepository;

  // @Transactional()
  async handle(event: SubscriptionCanceledEvent): Promise<void> {
    const ip = await this.ipRepository.findBySubscriptionId(event.id);
    if (!ip) return;
    ip.delete();
    await this.ipRepository.save(ip);
    ip.commit();
  }
}
