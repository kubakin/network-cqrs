import { FindAdminPrefixListQuery } from './find.prefix.list.query';
import { FindAdminPrefixListResult } from './find.prefix.list.result';

export interface AdminPrefixQuery {
  find: (
    options: FindAdminPrefixListQuery,
  ) => Promise<FindAdminPrefixListResult>;
}
