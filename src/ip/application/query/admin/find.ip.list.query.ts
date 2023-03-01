import { ApiProperty } from '@nestjs/swagger';
import { IQuery } from '@nestjs/cqrs';
import { BasePaginationClass } from '../../../../../lib/pagination/base.pagination.class';
import { Expose } from 'class-transformer';

export class FindAdminIpListFilter {
  @ApiProperty({ required: false })
  @Expose()
  readonly userId: string;
  @ApiProperty({ required: false })
  @Expose()
  readonly status: string;
}

export class FindAdminIpListQuery implements IQuery {
  @ApiProperty({ type: FindAdminIpListFilter })
  readonly filter: FindAdminIpListFilter;
  @ApiProperty({ type: BasePaginationClass })
  readonly pagination: BasePaginationClass;

  constructor(params: FindAdminIpListQuery) {
    Object.assign(this, params);
  }
}
