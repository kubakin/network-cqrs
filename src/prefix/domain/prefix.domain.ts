import { AggregateRoot } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { generateString } from '@nestjs/typeorm';
import { OrderCreatedEvent } from './event/order.created.event';

export type PrefixEssentialProperties = Readonly<
  Required<{
    id: string;
    userId: string;
    dataCenter: string;
    subscriptionId: string;
    as: string;
    prefix: string;
    version: number;
  }>
>;

export type PrefixOptionalProperties = Readonly<
  Partial<{
    status: string;
    initialized: boolean;
    deleted: boolean;
    isBlocked: boolean;
  }>
>;

export type PrefixProperties = PrefixEssentialProperties &
  Required<PrefixOptionalProperties>;

export class Prefix {
  commit: () => void;
  orderCreated: (firstOrder?: boolean) => void;
  prefixCreated: () => void;
  delete: () => void;
  deleteProcessStart: () => string | undefined;
  getSubscriptionId: () => string;
  startAnnouncingProcess: () => void;
}

export class PrefixDomain extends AggregateRoot implements Prefix {
  id: string;
  status: string;
  userId: string;
  version: number;
  subscriptionId: string;
  dataCenter: string;
  initialized: boolean;
  deleted: boolean;
  as: string;
  prefix: string;
  isBlocked: boolean;

  private readonly logger = new Logger(PrefixDomain.name);

  constructor(properties: PrefixProperties) {
    super();
    Object.assign(this, properties);
  }

  orderCreated(firstOrder = false) {
    this.apply(
      new OrderCreatedEvent(
        generateString(),
        this.userId,
        this.subscriptionId,
        firstOrder,
        this.dataCenter,
        this.version,
      ),
    );
  }

  prefixCreated() {}

  deleteConfirmed() {}

  startAnnouncingProcess() {
    this.initialized = true;
    this.status = 'announcing';
  }

  reject() {
    this.status = 'rejected';
    this.deleted = true;
  }

  announce() {
    this.status = 'active';
  }

  block() {
    this.isBlocked = true;
  }

  unblock() {
    this.isBlocked = false;
  }

  deleteProcessStart() {
    const invoiceId = generateString();
    return invoiceId;
  }

  delete() {}

  getSubscriptionId() {
    return this.subscriptionId;
  }
}
