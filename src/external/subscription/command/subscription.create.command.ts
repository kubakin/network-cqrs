import { ICommand } from '@nestjs/cqrs';
import { SubscriptionCreate } from '../subscription.messages';

export class SubscriptionCreateCommand implements ICommand {
  constructor(readonly create: SubscriptionCreate) {}
}
