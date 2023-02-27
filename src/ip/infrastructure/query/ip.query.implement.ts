import { Injectable } from '@nestjs/common';
import { IpQuery } from '../../application/query/ip.query';
import { FindIpListQuery } from '../../application/query/find.ip.list.query';
import { FindIpListResult } from '../../application/query/find.ip.list.result';
import { IpEntity } from '../ip.entity';
import { readConnection } from '../../../../lib/db.module';

@Injectable()
export class IpQueryImplement implements IpQuery {
  async find(query: FindIpListQuery): Promise<FindIpListResult> {
    const result = await readConnection
      .getRepository(IpEntity)
      .find({ where: { deleted: false, initialized: true } });
    return {
      result: result.map((ip) => {
        return {
          id: ip.id,
          status: ip.status,
          assignmentId: ip.assignmentId,
          assignmentType: ip.assignmentType,
          address: ip.address,
          family: ip.family,
          dataCenter: ip.dataCenter,
          dns_name: 'dnc',
        };
      }),
    };
  }
}
