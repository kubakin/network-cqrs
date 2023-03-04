import { AssignmentType } from '../../domain/enitites/assignment';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

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
  @IsUUID()
  @IsOptional()
  vdsId?: string;
  @Expose()
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  dedicId?: string;
  @Expose()
  @ApiProperty({
    type: Number,
  })
  @Expose()
  @IsIn([4, 6])
  @IsNotEmpty()
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

export class IpBuyAdmin extends BuyIp {
  @Expose()
  @ApiProperty()
  userId: string;
  @Expose()
  @ApiProperty()
  @IsOptional()
  address: string;
  @IsOptional()
  @Expose()
  @ApiProperty()
  prefix: string;
}

export class IpFilter {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  @Expose()
  assignmentId?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  @Expose()
  @IsString()
  dataCenter?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  @Expose()
  @IsIn([4, 6])
  family?: number;
}

export class SetReverseDns {
  @ApiProperty()
  @Expose()
  reverseDns: string;
}

export class DistributeFromUserPrefixDto {
  @Expose()
  @ApiProperty()
  @IsString()
  address: string;
  @Expose()
  @ApiProperty()
  @IsUUID()
  prefixId: string;
  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  assignmentId?: string;
  @Expose()
  @IsEnum(AssignmentType)
  @IsOptional()
  @ApiProperty({ required: false })
  assignmentType?: AssignmentType;
}
