import { FindUserIpListResult } from './find.ip.list.result';
import { FindUserIpListQuery } from './find.ip.list.query';

export interface UserIpQuery {
  find: (options: FindUserIpListQuery) => Promise<FindUserIpListResult>;
}
