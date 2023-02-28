import { ICommand } from '@nestjs/cqrs';

export class PrefixCreateCommand implements ICommand {
  constructor(
    readonly prefixes: string[],
    readonly asNumber: string,
    readonly version: number,
    readonly userId: string,
    readonly dataCenterName: string,
  ) {}
}
