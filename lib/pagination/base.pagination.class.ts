import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BasePaginationClass {
  @ApiProperty({ required: false })
  @Expose()
  readonly page: number;
  @ApiProperty({ required: false })
  @Expose()
  readonly size: number;
}
