import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { PrefixRepository } from '../../domain/prefix.repository';
import { PrefixDeleteRequestCommand } from './prefix.delete.request.command';

@CommandHandler(PrefixDeleteRequestCommand)
export class PrefixDeleteRequestHandler implements ICommandHandler<PrefixDeleteRequestCommand, string[]> {
  @Inject(InjectionToken.PREFIX_REPOSITORY)
  private readonly prefixRepository: PrefixRepository;

  async execute(command: PrefixDeleteRequestCommand): Promise<any> {
    const prefix = await this.prefixRepository.findById(command.id);
    prefix.deleteProcessStart();
    await this.prefixRepository.save(prefix);
    prefix.commit();
  }
}
