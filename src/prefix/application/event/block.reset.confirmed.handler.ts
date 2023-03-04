import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ResetConfirmedEvent } from '../../domain/event/reset.confirmed.event';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { PrefixRepository } from '../../domain/prefix.repository';

@EventsHandler(ResetConfirmedEvent)
export class BlockResetConfirmedHandler implements IEventHandler<ResetConfirmedEvent> {
  // @Transactional()
  @Inject(InjectionToken.PREFIX_REPOSITORY) prefixRepository: PrefixRepository;

  async handle(event: ResetConfirmedEvent): Promise<void> {
    const prefix = await this.prefixRepository.findById(event.id);
    if (prefix?.getStatus() === 'blocking') {
      prefix.blockConfirm();
      await this.prefixRepository.save(prefix);
      prefix.commit();
    }
  }
}
