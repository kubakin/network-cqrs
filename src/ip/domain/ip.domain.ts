import { AggregateRoot } from '@nestjs/cqrs';
import { Assignment, AssignmentType } from './enitites/assignment';
import { Address } from './enitites/address';
import { CreatedOrderEvent } from './event/created.order.event';
import { UnnassignRequestedEvent } from './event/unassign.requested.event';
import { AssignRequestedEvent } from './event/assign.requested.event';

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

export type IpProperties = IpEssentialProperties &
  Required<IptOptionalProperties>;

export class Ip {
  initialize: (address: string) => void;
  unnassign: () => void;
  assign: (assignmentId: string, assignmentType: AssignmentType) => void;
  unnassignRequest: () => void;
  assignRequest: () => void;
  commit: () => void;
  created: () => void;
  getAddress: () => Address;
  getDataCenter: () => string;
  getId: () => string;
  getOwner: () => string;
  getSubscriptionId: () => string;
  delete: () => void;
  unassignFailed: () => void;
  assignFailed: () => void;
  unassignConfirmed: () => void;
  assignConfirmed: () => void;
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

  constructor(properties: IpProperties) {
    super();
    Object.assign(this, properties);
  }

  initialize(address: string) {}

  created() {
    this.apply(
      new CreatedOrderEvent(
        this.id,
        this.subscriptionId,
        this.address.family,
        this.dataCenter,
        this.userId,
      ),
    );
  }

  assignConfirmed() {
    this.status = 'active';
  }

  unassignConfirmed() {
    this.assignment.reset();
    this.status = 'active';
  }

  assignFailed() {
    this.assignment.reset();
    this.status = 'active';
  }

  unassignFailed() {
    this.status = 'active';
  }

  unnassign() {
    this.unnassignRequest();
  }

  assign(assignmentId: string, assignmentType: AssignmentType) {
    this.assignment = new Assignment(assignmentId, assignmentType);
    this.status = 'assigning';
    this.assignRequest();
  }

  delete() {
    this.status = 'deleting';
    this.unnassignRequest();
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

  getSubscriptionId(): string {
    return this.subscriptionId;
  }
}
