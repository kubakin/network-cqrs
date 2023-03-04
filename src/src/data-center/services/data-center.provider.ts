import { BadRequestException, HttpException, Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DataCenterCustomerDomain } from './data-center.entity';

export class RpcResponse<T> {
  error?: HttpException;
  data?: T;
}

@Injectable()
export class DataCenterProvider {
  constructor(private connection: AmqpConnection) {}
  private readonly logger = new Logger('Data-center dcim provider');

  async getNetworkDataCenters() {
    return await this.request<DataCenterCustomerDomain[]>('network.get');
  }

  async getVdsDataCenters() {
    return await this.request<DataCenterCustomerDomain[]>('vds.get');
  }

  async getDedicDataCenters() {
    return await this.request<DataCenterCustomerDomain[]>('dedic.get');
  }

  private async request<T>(subject: string): Promise<T> {
    const response = await this.connection.request<RpcResponse<T>>({
      exchange: 'client',
      routingKey: 'rpc.dcim.data-center',
      payload: {
        subject,
      },
      timeout: 10000, // optional timeout for how long the request
      // should wait before failing if no response is received
    });
    if (!response.data) throw new BadRequestException('Error');
    return response.data;
  }
}
