import { Inject, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { DeleteRequestCommand } from './delete.request.command';
import { IpDeleteInvoiceId } from '../../api/ip/ip.dto';

@CommandHandler(DeleteRequestCommand)
export class DeleteRequestHandler implements ICommandHandler<DeleteRequestCommand, IpDeleteInvoiceId> {
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;

  constructor(private commandBus: CommandBus) {}

  // @Transactional()
  async execute(command: DeleteRequestCommand): Promise<IpDeleteInvoiceId> {
    const ip = await this.ipRepository.findUserIpById(command.id, command.userId);

    if (!ip) throw new NotFoundException('Ip not found');

    const invoiceId = ip.deleteProcessStart();
    await this.ipRepository.save(ip);
    ip.commit();
    return {
      value: invoiceId,
    };
  }
}
