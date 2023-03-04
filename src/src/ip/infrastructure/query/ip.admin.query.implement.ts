import { Injectable } from '@nestjs/common';
import { IpEntity } from '../ip.entity';
import { readConnection } from '../../../../lib/db.module';
import { AdminIpQuery } from '../../application/query/admin/ip.query';
import { FindAdminIpListResult } from '../../application/query/admin/find.ip.list.result';
import { FindAdminIpListQuery } from '../../application/query/admin/find.ip.list.query';

@Injectable()
export class IpAdminQueryImplement implements AdminIpQuery {
  async find(query: FindAdminIpListQuery): Promise<FindAdminIpListResult> {
    const result = await readConnection.getRepository(IpEntity).find({
      where: {
        deleted: false,
        initialized: true,
        ...query.filter,
      },
      order: {
        status: 'ASC',
        createdAt: 'DESC',
      },
    });
    return {
      page: 1,
      size: result.length,
      result: result.map(ip => {
        return {
          id: ip.id,
          status: ip.status,
          assignmentId: ip.assignmentId,
          assignmentType: ip.assignmentType,
          address: ip.address,
          family: ip.family,
          dataCenter: ip.dataCenter,
          dns_name: '',
          subscriptionId: ip.subscriptionId,
          primary: ip.primary,
          userId: ip.userId,
        };
      }),
    };
  }
}
