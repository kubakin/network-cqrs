import { ICommand } from '@nestjs/cqrs';

export class CreateOrderCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly family: number,
    readonly dataCenter: string,
    readonly invoiceId: string,
    readonly primary: boolean,
    readonly userId: string,
  ) {}
}
