import { IEvent } from '@nestjs/cqrs';

export class ResetConfirmedEvent implements IEvent {
  constructor(readonly id: string) {}
}
