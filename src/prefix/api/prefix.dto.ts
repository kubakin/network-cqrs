import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class AnnounceInvoicesId {
  @ApiProperty({ required: true, type: String, isArray: true })
  invoices: string[];
}

export class AnnouncePrefix {
  @IsNumber()
  @Expose()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  version: 4 | 6;
  @Expose()
  @IsString()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  dataCenterName: string;
  @ApiProperty({ required: true, type: String, isArray: true })
  @Expose()
  @IsNotEmpty()
  prefixes: string[];
  @Expose()
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  asNumber: string;
}
