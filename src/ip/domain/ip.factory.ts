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
  primary: boolean;
  subscriptionId: string | null;
}>;

type CreateAddressOptions = Readonly<{
  id: string;
  userId: string;
  dataCenter: string;
  family: number;
  address: string;
  assignment: Assignment | null;
  primary: boolean;
  subscriptionId: string | null;
}>;

export class IpFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  createOrder(options: CreateOrderOptions): Ip {
    return this.eventPublisher.mergeObjectContext(
      new IpDomain({
        ...options,
        address: new Address(options.family, options.address),
        status: 'created',
        deleted: false,
        subscriptionId: options.subscriptionId,
        initialized: false,
        assignment: null,
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
        assignment: options.assignment,
      }),
    );
  }

  reconstitute(properties: IpProperties): Ip {
    return this.eventPublisher.mergeObjectContext(new IpDomain(properties));
  }
}
