import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { DataCenterCustomerDomain } from './data-center.entity';
import { DataCenterProvider } from './data-center.provider';
import { Cache } from 'cache-manager';

@Injectable()
export class DataCenterRepository {
  private readonly ttl: number;
  private readonly key: string;

  constructor(
    private dataCenterProvider: DataCenterProvider,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.ttl = 600;
    this.key = 'dedic.data-centers';
  }

  async find(): Promise<DataCenterCustomerDomain[]> {
    const cached = await this.getFromCache();
    if (!cached) {
      await this.cacheDcList();
      return await this.find();
    }
    return cached;
  }

  async findByName(name: string) {
    const list = await this.find();
    return list.find((dc) => dc.name === name);
  }

  async findOne(id: string) {
    const list = await this.find();
    return list.find((dc) => dc.id === id);
  }

  private async getFromCache() {
    return await this.cacheManager.get<DataCenterCustomerDomain[]>(this.key);
  }

  private async cacheDcList() {
    const dcList = await this.requestDataCentersList();
    return await this.cacheManager.set(this.key, dcList, this.ttl);
  }

  private async requestDataCentersList() {
    return await this.dataCenterProvider.getNetworkDataCenters();
  }
}
