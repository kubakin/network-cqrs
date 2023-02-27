import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AssignmentType {
  vm = 'vm',
  ds = 'ds',
}

export class IpCreateCustomerEntity {
  address?: string;
  invoiceId: string;
  family: 4 | 6;
  userId: string;
  assignmentId?: string;
  assignmentType?: AssignmentType;
  dataCenter: string;
}

export class IpCreatePrimaryEntity {
  address: string;
  family: 4 | 6;
  userId: string;
  assignmentId: string;
  assignmentType: AssignmentType;
  dataCenter: string;
}

export class IpCreateAnnouncedEntity {
  address?: string;
  assignmentId?: string;
  assignmentType?: AssignmentType;
}

@Entity('network_ip')
export class IpEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('inet', { nullable: true, unique: false })
  address: string;

  @Column()
  family: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  dns_name: string;

  @Column({ default: 'active' })
  status: string;

  @Column('uuid', { nullable: true })
  userId: string;

  @Column({ type: 'enum', enum: AssignmentType, nullable: true })
  assignmentType?: AssignmentType;

  @Column({ type: 'uuid', nullable: true })
  assignmentId?: string;

  @Column('uuid', { nullable: true })
  subscriptionId?: string;

  // @Exclude()
  @Column('boolean', { default: false })
  primary: boolean;

  @Column('varchar', { default: 'Xelent' })
  dataCenter: string;

  @Column({ nullable: true })
  dataCenterId: number;

  @Column({ default: false })
  initialized: boolean;

  @Column({ default: false })
  deleted: boolean;
}
