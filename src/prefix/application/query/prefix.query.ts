import { FindUserPrefixListQuery } from './find.prefix.list.query';
import { FindUserPrefixListResult } from './find.prefix.list.result';

export interface PrefixQuery {
  find: (options: FindUserPrefixListQuery) => Promise<FindUserPrefixListResult>;
}
