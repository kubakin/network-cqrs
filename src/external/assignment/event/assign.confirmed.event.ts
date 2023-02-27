import { IEvent } from '@nestjs/cqrs';

export class AssignConfirmedEvent implements IEvent {
  constructor(readonly id: string, readonly address: string) {}
}
