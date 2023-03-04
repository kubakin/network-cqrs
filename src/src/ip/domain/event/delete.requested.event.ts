import { IEvent } from '@nestjs/cqrs';

export class DeleteRequestedEvent implements IEvent {
  constructor(readonly id: string) {}
}
