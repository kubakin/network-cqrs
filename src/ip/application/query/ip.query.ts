import { FindIpListResult } from './find.ip.list.result';
import { FindIpListQuery } from './find.ip.list.query';

export interface IpQuery {
  find: (options: FindIpListQuery) => Promise<FindIpListResult>;
}
