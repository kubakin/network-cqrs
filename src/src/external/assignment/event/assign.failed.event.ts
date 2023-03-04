import { IEvent } from '@nestjs/cqrs';

export class AssignFailedEvent implements IEvent {
  constructor(readonly id: string) {}
}
