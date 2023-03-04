import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { PrefixRepository } from '../../domain/prefix.repository';
import { PrefixUnblockCommand } from './prefix.unblock.command';

@CommandHandler(PrefixUnblockCommand)
export class PrefixUnblockHandler
  implements ICommandHandler<PrefixUnblockCommand, string[]>
{
  @Inject(InjectionToken.PREFIX_REPOSITORY)
  private readonly prefixRepository: PrefixRepository;

  async execute(command: PrefixUnblockCommand): Promise<any> {
    const prefix = await this.prefixRepository.findById(command.id);
    prefix.unblock();
    await this.prefixRepository.save(prefix);
    prefix.commit();
  }
}
