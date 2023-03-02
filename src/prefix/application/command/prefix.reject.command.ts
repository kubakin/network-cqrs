import { ICommand } from '@nestjs/cqrs';

export class PrefixRejectCommand implements ICommand {
  constructor(readonly id: string) {}
}
