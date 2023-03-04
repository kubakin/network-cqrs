import { IEvent } from '@nestjs/cqrs';

export class UnassignFailedEvent implements IEvent {
  constructor(readonly id: string) {}
}
