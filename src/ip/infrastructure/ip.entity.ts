import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export enum AssignmentType {
  vm = 'vm',
  ds = 'ds',
}

@Entity('ip')
export class IpEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('inet', { nullable: true, unique: false })
  address: string;

  @Column({ nullable: true })
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

  @Column({ default: true })
  initialized: boolean;

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  readonly createdAt: Date;
}
