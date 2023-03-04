import { IEvent } from '@nestjs/cqrs';

export class ResetPrefixRequestedEvent implements IEvent {
    constructor(
        readonly id: string,
    ) {}
}
