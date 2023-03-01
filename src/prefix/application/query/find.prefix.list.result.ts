import { IQueryResult } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';

class FindUserPrefixListItem {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly prefix: string;
  @ApiProperty()
  readonly dataCenterName: string;
}

export class FindUserPrefixListResult implements IQueryResult {
  @ApiProperty({ type: FindUserPrefixListItem, isArray: true })
  result: FindUserPrefixListItem[];

  constructor(list: FindUserPrefixListItem[]) {
    Object.assign(this, list);
  }
}
