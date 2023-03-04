import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindFreeAddressQuery } from './find.free.address.query';
import { FindFreeAddressResult } from './find.free.address.result';
import { NetboxService } from '../../infrastructure/integration/netbox.service';

@QueryHandler(FindFreeAddressQuery)
export class FindFreeAddressHandler implements IQueryHandler<FindFreeAddressQuery, FindFreeAddressResult> {
  constructor(private readonly dcimService: NetboxService) {}

  async execute(query: FindFreeAddressQuery): Promise<FindFreeAddressResult> {
    const address = await this.dcimService.findFreeCustomerAddress(query.dataCenterName, query.family, query.prefix);
    return {
      address,
    };
  }
}
