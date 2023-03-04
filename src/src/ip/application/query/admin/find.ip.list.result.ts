import { IQueryResult } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseClass } from '../../../../../lib/pagination/paginated.response.class';

class FindAdminIpListItem {
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
  @ApiProperty()
  readonly subscriptionId: string;
  @ApiProperty()
  readonly primary: boolean;
  @ApiProperty()
  readonly userId: string;
}

export class FindAdminIpListResult
  extends PaginatedResponseClass
  implements IQueryResult
{
  @ApiProperty({ type: FindAdminIpListItem, isArray: true })
  result: FindAdminIpListItem[];

  constructor(list: FindAdminIpListItem[]) {
    super();
    Object.assign(this, list);
  }
}
