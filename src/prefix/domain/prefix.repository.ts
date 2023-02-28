import { Prefix } from './prefix.domain';

export interface PrefixRepository {
  save: (ip: Prefix | Prefix[]) => Promise<void>;
  findById: (id: string) => Promise<Prefix | null>;
}
