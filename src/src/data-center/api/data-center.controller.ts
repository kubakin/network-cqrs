import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataCenterRepository } from '../services/data-center.repository';
import { DataCenterCustomerDomain } from '../services/data-center.entity';

@Controller('/api/ipam/data-center')
@ApiTags('network')
export class DataCenterController {
  constructor(private dataCenterRepository: DataCenterRepository) {}

  @Get('/')
  async dcList(): Promise<DataCenterCustomerDomain[]> {
    return await this.dataCenterRepository.find();
  }
}
