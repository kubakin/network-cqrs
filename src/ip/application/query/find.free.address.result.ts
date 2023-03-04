import { IQueryResult } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';


export class FindFreeAddressResult implements IQueryResult {
  @ApiProperty()
  address: string;

  constructor(list: FindFreeAddressResult) {
    Object.assign(this, list);
  }
}
