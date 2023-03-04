import { IEvent } from '@nestjs/cqrs';

export class CreatedOrderEvent implements IEvent {
  constructor(
    readonly id: string,
    readonly invoiceId: string,
    readonly family: number,
    readonly dataCenter: string,
    readonly userId: string,
  ) {}
}
