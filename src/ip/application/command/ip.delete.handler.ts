import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { IpDeleteCommand } from './ip.delete.command';

@CommandHandler(IpDeleteCommand)
export class IpDeleteHandler implements ICommandHandler<IpDeleteCommand, void> {
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;

  async execute(command: IpDeleteCommand): Promise<any> {
    const ip = await this.ipRepository.findById(command.id);
    if (!ip) return;
    ip.delete();
    await this.ipRepository.save(ip);
    ip.commit();
  }
}
