import { IEvent } from '@nestjs/cqrs';

export class CreatedIpEvent implements IEvent {
  constructor(
    readonly id: string,
    readonly family: number,
    readonly address: string,
    readonly userId: string,
  ) {}
}
