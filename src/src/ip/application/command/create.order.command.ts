import { ICommand } from '@nestjs/cqrs';

export class CreateOrderCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly family: number,
    readonly dataCenter: string,
    readonly invoiceId: string,
    readonly userId: string,
    readonly dedicId: string | null,
    readonly vdsId: string | null,
    readonly address?: string,
    readonly prefix?: string,
  ) {}
}
