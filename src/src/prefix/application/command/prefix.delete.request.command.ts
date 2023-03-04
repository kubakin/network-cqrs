import { ICommand } from '@nestjs/cqrs';

export class PrefixDeleteRequestCommand implements ICommand {
  constructor(readonly id: string) {}
}
