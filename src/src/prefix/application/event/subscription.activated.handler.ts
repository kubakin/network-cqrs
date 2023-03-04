import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { SubscriptionActivatedEvent } from '../../../external/subscription/event/subscription.activated.event';
import { PrefixRepository } from '../../domain/prefix.repository';

@EventsHandler(SubscriptionActivatedEvent)
export class SubscriptionActivatedHandler
  implements IEventHandler<SubscriptionActivatedEvent>
{
  @Inject(InjectionToken.PREFIX_REPOSITORY) prefixRepository: PrefixRepository;

  constructor(private readonly commandBus: CommandBus) {}

  // @Transactional()
  async handle(event: SubscriptionActivatedEvent): Promise<void> {
    const prefix = await this.prefixRepository.findBySubscriptionId(event.id);
    if (!prefix) return;
    prefix.startAnnouncingProcess();
    await this.prefixRepository.save(prefix);
    prefix.commit();
  }
}
