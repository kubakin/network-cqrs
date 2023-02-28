import { ICommand } from '@nestjs/cqrs';

export class DeleteRequestCommand implements ICommand {
  constructor(readonly id: string, readonly userId: string) {}
}
