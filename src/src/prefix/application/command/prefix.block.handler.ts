import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { PrefixRepository } from '../../domain/prefix.repository';
import { PrefixBlockCommand } from './prefix.block.command';

@CommandHandler(PrefixBlockCommand)
export class PrefixBlockHandler
  implements ICommandHandler<PrefixBlockCommand, void>
{
  @Inject(InjectionToken.PREFIX_REPOSITORY)
  private readonly prefixRepository: PrefixRepository;

  async execute(command: PrefixBlockCommand): Promise<any> {
    const prefix = await this.prefixRepository.findById(command.id);
    prefix.block();
    await this.prefixRepository.save(prefix);
    prefix.commit();
  }
}
