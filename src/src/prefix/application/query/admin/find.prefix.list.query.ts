import { ApiProperty } from '@nestjs/swagger';
import { BasePaginationClass } from '../../../../../lib/pagination/base.pagination.class';

export class FindAdminPrefixListFilter {
  @ApiProperty({ required: false })
  readonly status?: string;
}

export class FindAdminPrefixListQuery {
  @ApiProperty({ required: false, type: FindAdminPrefixListFilter })
  readonly filter?: FindAdminPrefixListFilter;
  @ApiProperty({ required: false, type: BasePaginationClass })
  readonly pagination: BasePaginationClass;

  constructor(params: FindAdminPrefixListQuery) {
    Object.assign(this, params);
  }
}
