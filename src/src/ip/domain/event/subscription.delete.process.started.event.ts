import { IEvent } from '@nestjs/cqrs';
import { SubscriptionCancel } from '../../../external/subscription/subscription.messages';

export class SubscriptionDeleteProcessStartedEvent implements IEvent {
  constructor(readonly cancel: SubscriptionCancel) {}
}
