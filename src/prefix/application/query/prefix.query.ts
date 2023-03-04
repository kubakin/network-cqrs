import { FindUserPrefixListQuery } from './find.prefix.list.query';
import { FindUserPrefixListResult } from './find.prefix.list.result';
import { FindUserPrefixQuery } from './find.user.prefix.query';
import { FindUserPrefixResult } from './find.user.prefix.result';

export interface PrefixQuery {
  find: (options: FindUserPrefixListQuery) => Promise<FindUserPrefixListResult>;
  findUserPrefix: (options: FindUserPrefixQuery) => Promise<FindUserPrefixResult>;
}
