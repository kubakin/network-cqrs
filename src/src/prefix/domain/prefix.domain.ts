import { AggregateRoot } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { generateString } from '@nestjs/typeorm';
import { OrderCreatedEvent } from './event/order.created.event';
import { ResetPrefixRequestedEvent } from './event/reset.prefix.requested.event';
import { ResetConfirmedEvent } from './event/reset.confirmed.event';
import { SubscriptionDeleteProcessStartedEvent } from '../../ip/domain/event/subscription.delete.process.started.event';
import { InitiatorType } from '../../external/subscription/subscription.messages';

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

export type PrefixProperties = PrefixEssentialProperties & Required<PrefixOptionalProperties>;

export class Prefix {
  commit: () => void;
  orderCreated: (firstOrder?: boolean) => void;
  prefixCreated: () => void;
  delete: () => void;
  deleteConfirm: () => void;
  deleteProcessStart: () => string;
  getSubscriptionId: () => string;
  announce: () => void;
  startAnnouncingProcess: () => void;
  block: () => void;
  blockConfirm: () => void;
  unblock: () => void;
  getPrefix: () => string;
  getDataCenter: () => string;
  getStatus: () => string;
  resetConfirm: () => void;
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

  deleteProcessStart() {
    const invoiceId = generateString();
    this.apply(
      new SubscriptionDeleteProcessStartedEvent({
        id: this.subscriptionId,
        invoiceId: invoiceId,
        initiator: InitiatorType.USER,
      }),
    );
    return invoiceId;
  }

  prefixCreated() {}

  deleteConfirmed() {}

  resetConfirm() {
    this.apply(new ResetConfirmedEvent(this.id));
  }

  startAnnouncingProcess() {
    this.initialized = true;
    this.status = 'announcing';
  }

  reset() {
    this.apply(new ResetPrefixRequestedEvent(this.id));
  }

  announce() {
    this.status = 'active';
  }

  block() {
    this.isBlocked = true;
    this.reset();
  }

  blockConfirm() {
    this.status = 'blocked';
  }

  deleteConfirm() {
    this.status = 'deleted';
  }

  unblock() {
    this.isBlocked = false;
  }

  delete() {
    this.status = 'deleting';
    this.reset();
  }

  getSubscriptionId() {
    return this.subscriptionId;
  }

  getPrefix() {
    return this.prefix;
  }

  getDataCenter() {
    return this.dataCenter;
  }

  getStatus() {
    return this.status;
  }
}
