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
    if (!this.customerPrefixNbRoleId)
      throw new InternalServerErrorException(
        'Customer announced role not provided',
      );
  }

  async createPrefix(id, prefix: string, dataCenterName: string) {
    const dataCenter = (
      await this.netboxApi.dcim.dcimSitesList({ name: dataCenterName })
    ).data.results[0];
    await this.netboxApi.ipam.ipamPrefixesCreate({
      data: {
        prefix: prefix,
        site: dataCenter.id,
        custom_fields: {
          instance_id: id,
        },
      },
    });
  }
}
