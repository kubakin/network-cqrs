import { Injectable } from '@nestjs/common';
import { IpEntity } from '../ip.entity';
import { readConnection } from '../../../../lib/db.module';
import { FindUserIpListQuery } from '../../application/query/find.ip.list.query';
import { UserIpQuery } from '../../application/query/ip.query';
import { FindUserIpListResult } from '../../application/query/find.ip.list.result';
import { Not } from 'typeorm';

@Injectable()
export class IpQueryImplement implements UserIpQuery {
  async find(query: FindUserIpListQuery): Promise<FindUserIpListResult> {
    const result = await readConnection.getRepository(IpEntity).find({
      where: {
        deleted: false,
        initialized: true,
        primary: false,
        status: Not('deleting'),
        ...query,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return {
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
        };
      }),
    };
  }
}
