import { IEvent } from '@nestjs/cqrs';

export class UnassignConfirmedEvent implements IEvent {
  constructor(readonly id: string, readonly address: string) {}
}
