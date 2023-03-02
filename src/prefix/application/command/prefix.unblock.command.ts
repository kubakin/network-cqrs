import { ICommand } from '@nestjs/cqrs';

export class PrefixUnblockCommand implements ICommand {
  constructor(readonly id: string) {}
}
