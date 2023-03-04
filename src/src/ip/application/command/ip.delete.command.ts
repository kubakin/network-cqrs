import { ICommand } from '@nestjs/cqrs';

export class IpDeleteCommand implements ICommand {
  constructor(readonly id: string) {}
}
