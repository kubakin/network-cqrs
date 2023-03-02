import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { PrefixRepository } from '../../domain/prefix.repository';
import { PrefixRejectCommand } from './prefix.reject.command';

@CommandHandler(PrefixRejectCommand)
export class PrefixRejectHandler
  implements ICommandHandler<PrefixRejectCommand, string[]>
{
  @Inject(InjectionToken.PREFIX_REPOSITORY)
  private readonly prefixRepository: PrefixRepository;

  async execute(command: PrefixRejectCommand): Promise<any> {
    const prefix = await this.prefixRepository.findById(command.id);
    prefix.reject();
    await this.prefixRepository.save(prefix);
    prefix.commit();
  }
}
