import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AnnounceInvoicesId {
  @ApiProperty({ required: true, type: String, isArray: true })
  invoices: string[];
}

export class AnnouncePrefix {
  @IsNumber()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  version: 4 | 6;
  @IsString()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  dataCenterName: string;
  @ApiProperty({ required: true, type: String, isArray: true })
  @IsNotEmpty()
  prefixes: string[];
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  asNumber: string;
}
