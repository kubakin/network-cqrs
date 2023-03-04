import { ICommand } from '@nestjs/cqrs';

export class PrefixAnnounceCommand implements ICommand {
  constructor(readonly id: string) {}
}
