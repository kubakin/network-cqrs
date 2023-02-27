import { Injectable } from '@nestjs/common';
import { NetboxApi } from '../../../../lib/netbox-api/src';

@Injectable()
export class NetboxService {
  constructor(private netboxApi: NetboxApi) {}

  async createAddress(address: string, instanceId: string) {
    return await this.netboxApi.ipam.ipamIpAddressesCreate({
      data: {
        address,
        description: 'Customer address',
        custom_fields: {
          ip_instance_id: instanceId,
        },
      } as any,
    });
  }

  async findFreeCustomerAddress(
    dataCenterName: string,
    family: number,
    prefix?: string,
  ) {
    const dataCenter = (
      await this.netboxApi.dcim.dcimSitesList({ name: dataCenterName })
    ).data.results[0];
    const result = await this.netboxApi.ipam.ipamPrefixesList({
      limit: 0,
      isPool: 'true',
      site: `${dataCenter.slug}`,
      family,
      role: prefix ? undefined : 'customer',
      prefix,
    });
    for (let i = 0; i < result.data.count; i++) {
      const currentPrefix = result.data.results[i];
      const availableIpsResponse =
        await this.netboxApi.ipam.ipamPrefixesAvailableIpsRead({
          id: currentPrefix.id,
        });
      if (availableIpsResponse.data.length === 0) {
        continue;
      }
      return availableIpsResponse.data[0].address;
    }
    return undefined;
    // throw new InternalServerErrorException('Available ips not found');
  }
}
