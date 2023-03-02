import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnassignRequestCommand } from './unassign.request.command';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';

@CommandHandler(UnassignRequestCommand)
export class UnassignRequestHandler
  implements ICommandHandler<UnassignRequestCommand, void>
{
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;

  // @Transactional()
  async execute(command: UnassignRequestCommand): Promise<void> {
    const ip = await this.ipRepository.findUserIpById(
      command.id,
      command.userId,
    );

    ip.readyToAction();
    ip.unnassign();

    await this.ipRepository.save(ip);

    ip.commit();
  }
}
