import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Prefix, PrefixDomain, PrefixProperties } from './prefix.domain';

type CreateOrderOptions = Readonly<{
  id: string;
  userId: string;
  dataCenter: string;
  version: number;
  subscriptionId: string;
  as: string;
  prefix: string;
}>;

export class PrefixFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  createOrder(options: CreateOrderOptions): Prefix {
    return this.eventPublisher.mergeObjectContext(
      new PrefixDomain({
        ...options,
        status: 'created',
        deleted: false,
        initialized: false,
        isBlocked: false,
      }),
    );
  }

  reconstitute(properties: PrefixProperties): Prefix {
    return this.eventPublisher.mergeObjectContext(new PrefixDomain(properties));
  }
}
