import { Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';

@Injectable()
export class IpManagerService {
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;

  @Interval(3000)
  async management() {
    const assigningAddresses = await this.ipRepository.findByStatus([
      'assigning',
    ]);

    assigningAddresses.map((ip) => {
      ip.assignRequest();
      ip.commit();
    });

    const unassigningAddresses = await this.ipRepository.findByStatus([
      'unassigning',
    ]);

    unassigningAddresses.map((ip) => {
      ip.unnassignRequest();
      ip.commit();
    });

    const deletingAddresses = await this.ipRepository.findByStatus([
      'deleting',
    ]);

    deletingAddresses.map((ip) => {
      ip.unnassignRequest();
      ip.commit();
    });
  }
}
