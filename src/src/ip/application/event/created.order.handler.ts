import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionCreateCommand } from '../../../external/subscription/command/subscription.create.command';
import { SubscriptionType } from '../../../external/subscription/subscription.messages';
import { CreatedOrderEvent } from '../../domain/event/created.order.event';

@EventsHandler(CreatedOrderEvent)
export class CreatedOrderHandler implements IEventHandler<CreatedOrderEvent> {
  // @Transactional()
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: CreatedOrderEvent): Promise<void> {
    await this.commandBus.execute(
      new SubscriptionCreateCommand({
        id: event.invoiceId,
        invoiceId: event.invoiceId,
        userId: event.userId,
        type: SubscriptionType.MONTHLY,
        autoProlong: true,
        items: [
          {
            id: event.id,
            discountable: false,
            monthlyPrice: '150',
            hourlyPrice: '0',
            metadata: {},
            name: `IP v${event.family}`,
          },
        ],
      }),
    );
  }
}
