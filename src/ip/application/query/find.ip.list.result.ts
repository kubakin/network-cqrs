import { IQueryResult } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';

class FindIpListItem {
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

export class FindIpListResponse<T> {
  @ApiProperty()
  list: T[];
}

export class FindIpListResult implements IQueryResult {
  @ApiProperty({ type: FindIpListItem, isArray: true })
  result: FindIpListItem[];

  constructor(list: FindIpListItem[]) {
    Object.assign(this, list);
  }
}
