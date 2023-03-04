import { IQueryResult } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';

class FindAdminPrefixListItem {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly prefix: string;
  @ApiProperty()
  readonly dataCenterName: string;
  @ApiProperty()
  readonly status: string;
  @ApiProperty()
  readonly subscriptionId: string;
  @ApiProperty()
  readonly as: string;
  @ApiProperty()
  readonly userId: string;
  @ApiProperty()
  readonly isBlocked: boolean;
}

export class FindAdminPrefixListResult implements IQueryResult {
  @ApiProperty({ type: FindAdminPrefixListItem, isArray: true })
  result: FindAdminPrefixListItem[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  constructor(list: FindAdminPrefixListItem[]) {
    Object.assign(this, list);
  }
}
