import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { CreateOrderCommand } from './create.order.command';
import { IpFactory } from '../../domain/ip.factory';
import { Assignment, AssignmentType } from '../../domain/enitites/assignment';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler
  implements ICommandHandler<CreateOrderCommand, void>
{
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;
  @Inject() private readonly ipFactory: IpFactory;

  async execute(command: CreateOrderCommand): Promise<void> {
    console.log('CreateOrderCommand');
    let assignment: Assignment;
    if (command.vdsId) {
      assignment = new Assignment(command.vdsId, AssignmentType.vm);
    } else if (command.dedicId) {
      assignment = new Assignment(command.dedicId, AssignmentType.ds);
    }
    const ip = await this.ipFactory.createOrder({
      ...command,
      assignment: assignment,
      subscriptionId: command.invoiceId,
    });
    ip.orderCreated();
    await this.ipRepository.save(ip);
    ip.commit();
  }
}
