import { ICommand } from '@nestjs/cqrs';

export class AssignmentResetCommand implements ICommand {
  constructor(readonly assignmentId: string) {}
}
