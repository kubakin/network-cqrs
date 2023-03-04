import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionCreateCommand } from '../../../external/subscription/command/subscription.create.command';
import { SubscriptionType } from '../../../external/subscription/subscription.messages';
import { OrderCreatedEvent } from '../../domain/event/order.created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  // @Transactional()
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: OrderCreatedEvent): Promise<void> {
    await this.commandBus.execute(
      new SubscriptionCreateCommand({
        id: event.invoiceId,
        invoiceId: event.invoiceId,
        userId: event.userId,
        type: SubscriptionType.MONTHLY,
        autoProlong: true,
        connectionCost: event.isFirst ? process.env.ANNOUNCE_CONNECTION_COST : '0',
        items: [
          {
            id: event.id,
            discountable: false,
            monthlyPrice: process.env.ANNOUNCE_PRICE,
            hourlyPrice: '0',
            metadata: {},
            name: `Prefix v${event.version} in ${event.dataCenter}`,
          },
        ],
      }),
    );
  }
}
