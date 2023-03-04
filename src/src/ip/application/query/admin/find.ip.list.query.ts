import { ApiProperty } from '@nestjs/swagger';
import { IQuery } from '@nestjs/cqrs';
import { BasePaginationClass } from '../../../../../lib/pagination/base.pagination.class';
import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class FindAdminIpListFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  @Expose()
  @IsUUID()
  readonly userId: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @Expose()
  readonly status: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @Expose()
  readonly address: string;
  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  readonly dataCenter: string;
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
