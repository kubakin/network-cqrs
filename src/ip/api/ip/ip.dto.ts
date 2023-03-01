import { AssignmentType } from '../../domain/enitites/assignment';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class IpCreateDto {
  family: 4 | 6;
  dataCenterId?: number;
  dataCenter?: string;
  assignmentType: AssignmentType;
  assignmentId: string;
  userId: string;
  subscriptionId: string;
}

export class IpBuyInvoiceId {
  @ApiProperty({ required: true })
  value?: string;
}

export class IpDeleteInvoiceId {
  @ApiProperty({ required: false })
  value?: string;
}

export class IpAssign {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  assignmentType: string;
  @Expose()
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  assignmentId: string;
}

export class BuyIp {
  @Expose()
  @ApiProperty({ required: false })
  vdsId?: string;
  @Expose()
  @ApiProperty({ required: false })
  dedicId?: string;
  @Expose()
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @Expose()
  @ApiProperty({ required: true })
  version: 4 | 6;
  @IsString()
  @Expose()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  dataCenterName: string;
  @Expose()
  @ApiProperty({ required: false })
  forNew?: boolean = false;
}

export class IpFilter {
  @Expose()
  assignmentId?: string;
}

export class SetReverseDns {
  @ApiProperty()
  reverseDns: string;
}
