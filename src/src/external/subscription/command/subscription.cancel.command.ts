import { ICommand } from '@nestjs/cqrs';
import { SubscriptionCancel } from '../subscription.messages';

export class SubscriptionCancelCommand implements ICommand {
  constructor(readonly cancel: SubscriptionCancel) {}
}
