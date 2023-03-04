import {ApiProperty} from '@nestjs/swagger';

export class DataCenterCustomerDomain {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  city: string;
  dcimId: number
}
