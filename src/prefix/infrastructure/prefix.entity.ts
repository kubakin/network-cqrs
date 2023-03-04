import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('customer_prefix')
export class PrefixEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;
  @Column({ nullable: true })
  @ApiProperty()
  as: string;
  @Column()
  @ApiProperty()
  version: number;
  @Column()
  @ApiProperty()
  prefix: string;
  @Column()
  @ApiProperty()
  dataCenter: string;
  @Column()
  @ApiProperty()
  subscriptionId: string;
  @Column()
  @ApiProperty()
  userId: string;
  @Column({ default: 'created' })
  @ApiProperty()
  status: string;
  @Column({ default: false })
  @ApiProperty()
  initialized: boolean;
  @Column({ default: false })
  @ApiProperty()
  deleted: boolean;
  @Column({ default: false })
  @ApiProperty()
  isBlocked: boolean;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  readonly createdAt: Date;
}
