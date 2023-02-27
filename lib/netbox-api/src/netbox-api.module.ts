import { Module } from '@nestjs/common';
import { NetboxApi } from './netbox-api';

@Module({
  providers: [NetboxApi],
  exports: [NetboxApi],
})
export class NetboxApiModule {}
