import { Ip } from './ip.domain';

export interface IpRepository {
  save: (ip: Ip | Ip[]) => Promise<void>;
  findById: (id: string) => Promise<Ip | null>;
  findBySubscriptionId: (id: string) => Promise<Ip | null>;
  findByAddress: (address: string) => Promise<Ip[]>;
  findByStatus: (status: string[]) => Promise<Ip[]>;
  findAll: () => Promise<Ip[]>;
}
