import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ResetConfirmedEvent } from '../../domain/event/reset.confirmed.event';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { PrefixRepository } from '../../domain/prefix.repository';

@EventsHandler(ResetConfirmedEvent)
export class DeleteResetConfirmedHandler implements IEventHandler<ResetConfirmedEvent> {
  // @Transactional()
  @Inject(InjectionToken.PREFIX_REPOSITORY) prefixRepository: PrefixRepository;

  async handle(event: ResetConfirmedEvent): Promise<void> {
    const prefix = await this.prefixRepository.findById(event.id);
    if (prefix?.getStatus() === 'deleting') {
      prefix.deleteConfirm();
      //todo удаление системных адресов и удаление самого префикса
      await this.prefixRepository.save(prefix);
      prefix.commit();
    }
  }
}
