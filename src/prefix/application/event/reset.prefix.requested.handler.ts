import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { PrefixRepository } from '../../domain/prefix.repository';
import { ResetPrefixRequestedEvent } from '../../domain/event/reset.prefix.requested.event';
import { NetboxService } from '../../infrastructure/integration/netbox.service';
import { Interval } from '@nestjs/schedule';
import { DeleteRequestCommand } from '../../../ip/application/command/delete.request.command';

@EventsHandler(ResetPrefixRequestedEvent)
export class ResetPrefixRequestedHandler implements IEventHandler<ResetPrefixRequestedEvent> {
  @Inject(InjectionToken.PREFIX_REPOSITORY) prefixRepository: PrefixRepository;

  constructor(private dcimService: NetboxService, private commandBud: CommandBus) {}

  @Interval(3000)
  async test() {
    return;
    await this.handle({ id: '0288902b-6728-411d-89c0-44f21225602f' });
  }

  // @Transactional()
  async handle(event: ResetPrefixRequestedEvent): Promise<void> {
    const prefix = await this.prefixRepository.findById(event.id);
    if (!prefix) return;
    const ids = await this.dcimService.prefixChildIds(event.id);
    if (ids.length) {
      ids.map(async id => {
        await this.commandBud.execute(new DeleteRequestCommand(id));
      });
    } else {
      prefix.resetConfirm();
      prefix.commit();
    }
  }
}
