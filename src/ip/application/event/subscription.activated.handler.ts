import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { IpCreateCommand } from '../command/ip.create.command';
import { SubscriptionActivatedEvent } from '../../../external/subscription/event/subscription.activated.event';

@EventsHandler(SubscriptionActivatedEvent)
export class SubscriptionActivatedHandler
  implements IEventHandler<SubscriptionActivatedEvent>
{
  @Inject(InjectionToken.IP_REPOSITORY) ipRepository: IpRepository;

  constructor(private readonly commandBus: CommandBus) {}

  // @Transactional()
  async handle(event: SubscriptionActivatedEvent): Promise<void> {
    const ip = await this.ipRepository.findBySubscriptionId(event.id);
    if (!ip) return;
    await this.commandBus.execute(
      new IpCreateCommand(
        ip.getId(),
        ip.getOwner(),
        ip.getDataCenter(),
        ip.getAddress().family,
        false,
        ip.getSubscriptionId(),
        ip.getAssignment().assignmentId,
        ip.getAssignment().assignmentType,
      ),
    );
  }
}
