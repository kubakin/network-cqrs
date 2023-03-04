import { ICommand } from '@nestjs/cqrs';

export class UnassignRequestCommand implements ICommand {
  constructor(readonly id: string, readonly userId: string) {}
}
