import { IEvent } from '@nestjs/cqrs';

export class SubscriptionCanceledEvent implements IEvent {
  constructor(readonly id: string) {}
}
