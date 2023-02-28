import { IEvent } from '@nestjs/cqrs';

export class OrderCreatedEvent implements IEvent {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly invoiceId: string,
    readonly isFirst: boolean,
    readonly dataCenter: string,
    readonly version: number,
  ) {}
}
