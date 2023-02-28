import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IpCreateCommand } from './ip.create.command';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { IpRepository } from '../../domain/ip.repository';
import { IpFactory } from '../../domain/ip.factory';
import { NetboxService } from '../../infrastructure/integration/netbox.service';

@CommandHandler(IpCreateCommand)
export class IpCreateHandler
  implements ICommandHandler<IpCreateCommand, string>
{
  @Inject(InjectionToken.IP_REPOSITORY)
  private readonly ipRepository: IpRepository;
  @Inject() private readonly ipFactory: IpFactory;

  constructor(private readonly dcimService: NetboxService) {}

  async execute(command: IpCreateCommand): Promise<any> {
    let address: string;
    if (command.address) {
      address = command.address;
    } else {
      address = await this.dcimService.findFreeCustomerAddress(
        command.dataCenter,
        command.family,
        command.prefix,
      );
    }
    if (!address) {
      throw new InternalServerErrorException('Ip not found');
    }
    const createdAddress = await this.dcimService.createAddress(
      address,
      command.id,
    );
    const ip = await this.ipFactory.createAddress({
      ...command,
      address: createdAddress.data.address,
    });
    ip.ipCreated();
    if (command.assignmentId) {
      ip.assign(command.assignmentId, command.assignmentType);
    }
    await this.ipRepository.save(ip);

    ip.commit();
    return {
      id: command.id,
      address: createdAddress.data.address,
    };
  }
}
