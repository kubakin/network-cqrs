import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { CreateOrderCommand } from './create.order.command';
import { IpFactory } from '../../domain/ip.factory';
import { Assignment, AssignmentType } from '../../domain/enitites/assignment';
import { Address } from '../../domain/enitites/address';
import { NetboxService } from '../../infrastructure/integration/netbox.service';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand, void> {
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;
  @Inject() private readonly ipFactory: IpFactory;

  constructor(private readonly dcimService: NetboxService) {}

  async execute(command: CreateOrderCommand): Promise<void> {
    let assignment: Assignment;
    const resourceEnough = !!(await this.dcimService.findFreeCustomerAddress(
      command.dataCenter,
      command.family,
      command.prefix,
    ));

    if (!resourceEnough) throw new InternalServerErrorException('Not enough ip addresses');
    if (command.vdsId) {
      assignment = new Assignment(command.vdsId, AssignmentType.vm);
    } else if (command.dedicId) {
      assignment = new Assignment(command.dedicId, AssignmentType.ds);
    }
    const ip = await this.ipFactory.createOrder({
      ...command,
      address: command.address ? Address.create(command.address, command.prefix).address : undefined,
      assignment: assignment,
      subscriptionId: command.invoiceId,
    });
    ip.orderCreated();
    await this.ipRepository.save(ip);
    ip.commit();
  }
}
