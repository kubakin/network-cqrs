import { AssignmentType } from '../../domain/enitites/assignment';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

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
  assignmentType: string;
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  assignmentId: string;
}

export class BuyIp {
  @ApiProperty({ required: false })
  vdsId?: string;
  @ApiProperty({ required: false })
  dedicId?: string;
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @ApiProperty({ required: true })
  version: 4 | 6;
  @IsString()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  dataCenterName: string;
  @ApiProperty({ required: false })
  forNew?: boolean = false;
}

export class IpFilter {
  assignmentId?: string;
}

export class SetReverseDns {
  @ApiProperty()
  reverseDns: string;
}
