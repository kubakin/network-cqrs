import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseClass {
  @ApiProperty({ required: false })
  readonly page: number;
  @ApiProperty({ required: false })
  readonly size: number;
}
