import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { AssignRequestCommand } from './assign.request.command';

@CommandHandler(AssignRequestCommand)
export class AssignRequestHandler implements ICommandHandler<AssignRequestCommand, void> {
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;

  // @Transactional()
  async execute(command: AssignRequestCommand): Promise<void> {
    const ip = await this.ipRepository.findUserIpById(command.id, command.userId);

    if (!ip) throw new NotFoundException('Ip not found');

    ip.readyToAction();
    ip.assign(command.assignmentId, command.assignmentType as any);

    await this.ipRepository.save(ip);

    ip.commit();
  }
}
