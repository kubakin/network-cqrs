import { IQueryResult } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserPrefixResult implements IQueryResult {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly prefix: string;
  @ApiProperty()
  readonly dataCenterName: string;
  @ApiProperty()
  readonly family: number;
}
