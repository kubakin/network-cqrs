import { FindAdminIpListResult } from './find.ip.list.result';
import { FindAdminIpListQuery } from './find.ip.list.query';

export interface AdminIpQuery {
  find: (options: FindAdminIpListQuery) => Promise<FindAdminIpListResult>;
}
