import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Ip, IpDomain, IpProperties } from './ip.domain';
import { Address } from './enitites/address';
import { Assignment } from './enitites/assignment';

type CreateOrderOptions = Readonly<{
  id: string;
  userId: string;
  dataCenter: string;
  family: number;
  address?: string;
  subscriptionId: string | null;
  assignment?: Assignment;
}>;

type CreateAddressOptions = Readonly<{
  id: string;
  userId: string;
  dataCenter: string;
  family: number;
  address: string;
  primary: boolean;
  subscriptionId: string | null;
}>;

export class IpFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  createOrder(options: CreateOrderOptions): Ip {
    return this.eventPublisher.mergeObjectContext(
      new IpDomain({
        ...options,
        primary: false,
        assignment: options.assignment,
        address: new Address(options.family, options.address),
        status: 'created',
        deleted: false,
        subscriptionId: options.subscriptionId,
        initialized: false,
      }),
    );
  }

  createAddress(options: CreateAddressOptions): Ip {
    return this.eventPublisher.mergeObjectContext(
      new IpDomain({
        ...options,
        address: new Address(options.family, options.address),
        status: 'active',
        deleted: false,
        subscriptionId: options.subscriptionId,
        initialized: true,
        assignment: null,
      }),
    );
  }

  reconstitute(properties: IpProperties): Ip {
    return this.eventPublisher.mergeObjectContext(new IpDomain(properties));
  }
}
