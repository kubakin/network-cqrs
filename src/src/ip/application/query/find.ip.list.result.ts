import { IQueryResult } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';

class FindUserIpListItem {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly address: string;
  @ApiProperty()
  readonly family: number;
  @ApiProperty()
  readonly dns_name: string;
  @ApiProperty()
  readonly status: string;
  @ApiProperty()
  readonly assignmentType?: string;
  @ApiProperty()
  readonly assignmentId?: string;
  @ApiProperty()
  readonly dataCenter: string;
}

export class FindUserIpListResult implements IQueryResult {
  @ApiProperty({ type: FindUserIpListItem, isArray: true })
  result: FindUserIpListItem[];

  constructor(list: FindUserIpListItem[]) {
    Object.assign(this, list);
  }
}
