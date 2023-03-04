import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { PrefixRepository } from '../../domain/prefix.repository';
import { PrefixAnnounceCommand } from './prefix.announce.command';
import { NetboxService } from '../../infrastructure/integration/netbox.service';

@CommandHandler(PrefixAnnounceCommand)
export class PrefixAnnounceHandler
  implements ICommandHandler<PrefixAnnounceCommand, void>
{
  @Inject(InjectionToken.PREFIX_REPOSITORY)
  private readonly prefixRepository: PrefixRepository;

  constructor(private dcimService: NetboxService) {}

  async execute(command: PrefixAnnounceCommand): Promise<any> {
    const prefix = await this.prefixRepository.findById(command.id);
    prefix.announce();
    await this.dcimService.createPrefix(
      command.id,
      prefix.getPrefix(),
      prefix.getDataCenter(),
    );
    await this.prefixRepository.save(prefix);
    prefix.commit();
  }
}
