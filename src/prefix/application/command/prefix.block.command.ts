import { ICommand } from '@nestjs/cqrs';

export class PrefixBlockCommand implements ICommand {
  constructor(readonly id: string) {}
}
