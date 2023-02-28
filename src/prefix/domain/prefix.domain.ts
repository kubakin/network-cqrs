import { AggregateRoot } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { generateString } from '@nestjs/typeorm';

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
  orderCreated: () => void;
  prefixCreated: () => void;
  delete: () => void;
  deleteProcessStart: () => string | undefined;
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

  orderCreated() {}

  prefixCreated() {}

  deleteConfirmed() {}

  deleteProcessStart() {
    const invoiceId = generateString();
    return invoiceId;
  }

  delete() {}
}
