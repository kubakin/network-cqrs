import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { CreateOrderCommand } from './create.order.command';
import { IpFactory } from '../../domain/ip.factory';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler
  implements ICommandHandler<CreateOrderCommand, void>
{
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;
  @Inject() private readonly ipFactory: IpFactory;

  async execute(command: CreateOrderCommand): Promise<void> {
    const ip = await this.ipFactory.createOrder({
      ...command,
      subscriptionId: command.invoiceId,
    });
    ip.created();
    await this.ipRepository.save(ip);
    ip.commit();
  }
}
