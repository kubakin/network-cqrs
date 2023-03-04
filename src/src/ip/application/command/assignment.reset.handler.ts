import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { AssignmentResetCommand } from './assignment.reset.command';

@CommandHandler(AssignmentResetCommand)
export class AssignmentResetHandler implements ICommandHandler<AssignmentResetCommand, void> {
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;

  // @Transactional()
  async execute(command: AssignmentResetCommand): Promise<void> {
    const ips = await this.ipRepository.findByAssignment(command.assignmentId);
    ips.map(async ip => {
      ip.unnassign(true);
      await this.ipRepository.save(ip);
      ip.commit();
    });
  }
}
