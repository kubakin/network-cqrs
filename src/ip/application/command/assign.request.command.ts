import { ICommand } from '@nestjs/cqrs';

export class AssignRequestCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly assignmentId: string,
    readonly assignmentType: string,
    readonly userId: string,
  ) {}
}
