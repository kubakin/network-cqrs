import { Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';

@Injectable()
export class IpManagerService {
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;
  private readonly logger = new Logger(IpManagerService.name);

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
    if (deletingAddresses.length) {
      this.logger.debug(
        `${deletingAddresses.length} addresses in deleting process`,
      );
    }
    if (unassigningAddresses.length) {
      this.logger.debug(
        `${unassigningAddresses.length} addresses in unassigning process`,
      );
    }
    if (assigningAddresses.length) {
      this.logger.debug(
        `${assigningAddresses.length} addresses in assigning process`,
      );
    }

    deletingAddresses.map((ip) => {
      ip.deleteRequest();
      ip.commit();
    });
  }
}
