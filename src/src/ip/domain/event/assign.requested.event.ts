import { IEvent } from '@nestjs/cqrs';

export class AssignRequestedEvent implements IEvent {
  constructor(
    private readonly id: string,
    private readonly address: string,
    private readonly userId: string,
    private readonly assignmentId: string,
    private readonly assignmentType: string,
  ) {}
}
