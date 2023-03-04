import { IEvent } from '@nestjs/cqrs';

export class UnnassignRequestedEvent implements IEvent {
  constructor(
    private readonly id: string,
    private readonly address: string,
    private readonly userId: string,
    private readonly oldAssignmentId: string,
    private readonly oldAssignmentType: string,
  ) {}
}
