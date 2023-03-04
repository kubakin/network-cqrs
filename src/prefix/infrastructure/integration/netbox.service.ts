import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NetboxApi } from '../../../../lib/netbox-api/src';

@Injectable()
export class NetboxService {
  customerPrefixNbRoleId: number;

  constructor(private netboxApi: NetboxApi) {}

  async onApplicationBootstrap() {
    const role = await this.netboxApi.ipam.ipamRolesList({
      slug: 'customer_announced',
    });
    this.customerPrefixNbRoleId = role.data?.results?.[0]?.id;
    if (!this.customerPrefixNbRoleId) throw new InternalServerErrorException('Customer announced role not provided');
  }

  async prefixChildIds(id: string): Promise<string[]> {
    const result = await this.netboxApi.ipam.ipamPrefixesList({}, { query: { cf_instance_id: id } });
    const prefix = result.data.results?.[0];
    const ipResult = await this.netboxApi.ipam.ipamIpAddressesList({ parent: prefix.prefix, limit: 0 });
    return ipResult.data.results
      .filter((rs: any) => rs.custom_fields.ip_instance_id as string)
      .map((ip: any) => ip.custom_fields.ip_instance_id as string);
  }

  private async delete(id: number) {
    await this.netboxApi.ipam.ipamIpAddressesDelete({ id });
  }

  async deleteByInstance(id: string) {
    const result = await this.netboxApi.ipam.ipamIpAddressesList({}, { query: { cf_ip_instance_id: id } });
    const ip = result.data.results?.[0];
    if (ip) {
      await this.delete(ip.id);
    }
  }

  async createPrefix(id, prefix: string, dataCenterName: string) {
    const dataCenter = (await this.netboxApi.dcim.dcimSitesList({ name: dataCenterName })).data.results[0];
    await this.netboxApi.ipam.ipamPrefixesCreate({
      data: {
        prefix: prefix,
        site: dataCenter.id,
        status: 'active' as any,
        is_pool: true,
        custom_fields: {
          instance_id: id,
        },
      },
    });
  }
}
