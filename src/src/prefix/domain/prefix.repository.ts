import { Prefix } from './prefix.domain';

export interface PrefixRepository {
  save: (ip: Prefix | Prefix[]) => Promise<void>;
  findById: (id: string) => Promise<Prefix | null>;
  findBySubscriptionId: (id: string) => Promise<Prefix | null>;

  findUserPrefixInDataCenter: (
    dataCenter: string,
    userId: string,
  ) => Promise<Prefix | null>;
}
