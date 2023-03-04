import { IEvent } from '@nestjs/cqrs';

export class SubscriptionActivatedEvent implements IEvent {
  constructor(readonly id: string) {}
}
