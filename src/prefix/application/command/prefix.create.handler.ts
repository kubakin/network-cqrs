import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrefixCreateCommand } from './prefix.create.command';
import { generateString } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { PrefixFactory } from '../../domain/prefix.factory';
import { InjectionToken } from '../injection.token';
import { PrefixRepository } from '../../domain/prefix.repository';

@CommandHandler(PrefixCreateCommand)
export class PrefixCreateHandler
  implements ICommandHandler<PrefixCreateCommand, string[]>
{
  @Inject() private readonly prefixFactory: PrefixFactory;
  @Inject(InjectionToken.PREFIX_REPOSITORY)
  private readonly prefixRepository: PrefixRepository;

  async execute(command: PrefixCreateCommand): Promise<any> {
    const userPrefix = await this.prefixRepository.findUserPrefixInDataCenter(
      command.dataCenterName,
      command.userId,
    );
    let isFirstPrefix = true;
    if (userPrefix) {
      isFirstPrefix = false;
    }
    const orders = await Promise.all(
      command.prefixes.map(async (prefix) => {
        const invoiceId = generateString();
        return this.prefixFactory.createOrder({
          id: generateString(),
          prefix,
          userId: command.userId,
          subscriptionId: invoiceId,
          as: command.asNumber,
          dataCenter: command.dataCenterName,
          version: command.version,
        });
      }),
    );
    await this.prefixRepository.save(orders);

    orders.map((order) => {
      order.orderCreated(isFirstPrefix);
      isFirstPrefix = false;
      order.commit();
    });

    return orders.map((order) => order.getSubscriptionId());
  }
}
