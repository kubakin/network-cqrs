import { AggregateRoot } from '@nestjs/cqrs';
import { Assignment, AssignmentType } from './enitites/assignment';
import { Address } from './enitites/address';
import { CreatedOrderEvent } from './event/created.order.event';
import { UnnassignRequestedEvent } from './event/unassign.requested.event';
import { AssignRequestedEvent } from './event/assign.requested.event';
import { CreatedIpEvent } from './event/created.ip.event';
import { BadRequestException, Logger } from '@nestjs/common';
import { generateString } from '@nestjs/typeorm';
import { SubscriptionDeleteProcessStartedEvent } from './event/subscription.delete.process.started.event';
import { InitiatorType } from '../../external/subscription/subscription.messages';
import { DeleteRequestedEvent } from './event/delete.requested.event';

export type IpEssentialProperties = Readonly<
  Required<{
    id: string;
    userId: string;
    dataCenter: string;
    address: Address;
    primary: boolean;
  }>
>;

export type IptOptionalProperties = Readonly<
  Partial<{
    assignment: Assignment;
    status: string;
    initialized: boolean;
    deleted: boolean;
    subscriptionId: string;
  }>
>;

export type IpProperties = IpEssentialProperties & Required<IptOptionalProperties>;

export class Ip {
  unnassign: (force?: boolean) => void;
  assign: (assignmentId: string, assignmentType: AssignmentType) => void;
  unnassignRequest: () => void;
  assignRequest: () => void;
  deleteRequest: () => void;
  commit: () => void;
  orderCreated: () => void;
  ipCreated: () => void;
  getAddress: () => Address;
  getDataCenter: () => string;
  getId: () => string;
  getAssignment: () => Assignment;
  getOwner: () => string;
  getSubscriptionId: () => string;
  delete: () => void;
  unassignFailed: () => void;
  assignFailed: () => void;
  unassignConfirmed: () => void;
  deleteConfirmed: () => void;
  assignConfirmed: () => void;
  deleteProcessStart: () => string | undefined;
  readyToAction: () => void;
}

export class IpDomain extends AggregateRoot implements Ip {
  id: string;
  address: Address;
  status: string;
  userId: string;
  assignment: Assignment | null;
  primary: boolean;
  subscriptionId: string;
  dataCenter: string;
  initialized: boolean;
  deleted: boolean;
  private readonly logger = new Logger(IpDomain.name);

  constructor(properties: IpProperties) {
    super();
    Object.assign(this, properties);
  }

  orderCreated() {
    this.apply(new CreatedOrderEvent(this.id, this.subscriptionId, this.address.family, this.dataCenter, this.userId));
  }

  readyToAction() {
    if (this.status === 'active') {
      return;
    }
    throw new BadRequestException(`Current operation: ${this.status}`);
  }

  ipCreated() {
    this.apply(new CreatedIpEvent(this.id, this.address.family, this.address.address, this.userId));
  }

  assignConfirmed() {
    this.logger.debug(`${this.address.address} assign confirmed`);
    this.status = 'active';
  }

  unassignConfirmed() {
    this.logger.debug(`${this.address.address} unassign confirmed`);

    this.assignment.reset();

    if (this.primary) {
      this.delete();
      return;
    }

    if (this.status === 'deleting') {
      this.delete();
      return;
    }

    this.status = 'active';
  }

  deleteConfirmed() {
    this.logger.debug(`${this.address.address} delete confirmed`);
    this.deleted = true;
    this.status = 'deleted';
  }

  assignFailed() {
    this.logger.error(`${this.address.address} assign failed`);

    this.assignment.reset();
    this.status = 'active';
  }

  unassignFailed() {
    this.logger.error(`${this.address.address} unassign failed`);

    if (this.status === 'deleting') return;
    this.status = 'active';
  }

  unnassign(force = false) {
    this.status = 'unassigning';

    if (!this?.assignment?.assignmentId) {
      throw new BadRequestException('Ip without assignment');
    }
    if (force) {
      this.unassignConfirmed();
      return;
    }
    this.unnassignRequest();
  }

  assign(assignmentId: string, assignmentType: AssignmentType) {
    if (this?.assignment?.assignmentId) {
      throw new BadRequestException('Already assigned');
    }
    this.status = 'assigning';

    this.assignment = new Assignment(assignmentId, assignmentType);
    this.assignRequest();
  }

  deleteProcessStart() {
    if (this.primary) throw new BadRequestException('Cant delete primary ip');
    const invoiceId = generateString();
    if (this.subscriptionId) {
      this.apply(
        new SubscriptionDeleteProcessStartedEvent({
          id: this.subscriptionId,
          invoiceId: invoiceId,
          initiator: InitiatorType.USER,
        }),
      );
      return invoiceId;
    } else {
      this.delete();
      return undefined;
    }
  }

  delete() {
    if (this.initialized && !this.deleted) {
      this.status = 'deleting';
      this.deleteRequest();
    }
  }

  unnassignRequest() {
    this.apply(
      new UnnassignRequestedEvent(
        this.id,
        this.address.address,
        this.userId,
        this.assignment.assignmentId,
        this.assignment.assignmentType,
        // this.assignment.assignmentId,
        // this.assignment.assignmentType,
      ),
    );
  }

  deleteRequest() {
    if (this.assignment?.assignmentId) {
      this.unnassignRequest();
    } else {
      this.apply(new DeleteRequestedEvent(this.id));
    }
  }

  assignRequest() {
    this.apply(
      new AssignRequestedEvent(
        this.id,
        this.address.address,
        this.userId,
        this.assignment.assignmentId,
        this.assignment.assignmentType,
      ),
    );
  }

  getDataCenter(): string {
    return this.dataCenter;
  }

  getId(): string {
    return this.id;
  }

  getAddress(): Address {
    return this.address;
  }

  getOwner(): string {
    return this.userId;
  }

  getAssignment(): Assignment {
    return this.assignment;
  }

  getSubscriptionId(): string {
    return this.subscriptionId;
  }
}
