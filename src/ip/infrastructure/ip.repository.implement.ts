import { Inject } from '@nestjs/common';

import { IpRepository } from '../domain/ip.repository';
import { Ip } from '../domain/ip.domain';
import { IpFactory } from '../domain/ip.factory';
import { IpEntity } from './ip.entity';
import { writeConnection } from '../../../lib/db.module';
import { Assignment } from '../domain/enitites/assignment';
import { Address } from '../domain/enitites/address';
import { In } from 'typeorm';

export class IpRepositoryImplement implements IpRepository {
  @Inject() private readonly ipFactory: IpFactory;

  async save(data: Ip | Ip[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(IpEntity).save(entities);
  }

  async findById(id: string): Promise<Ip | null> {
    const entity = await writeConnection.manager
      .getRepository(IpEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  async findAll(): Promise<Ip[]> {
    const entities = await writeConnection.manager
      .getRepository(IpEntity)
      .find({ where: { deleted: false } });
    return entities.map((entity) => this.entityToModel(entity));
  }

  async findByStatus(status: string[]): Promise<Ip[]> {
    const entities = await writeConnection.manager
      .getRepository(IpEntity)
      .find({
        where: { deleted: false, initialized: true, status: In(status) },
      });
    return entities.map((entity) => this.entityToModel(entity));
  }

  async findByAddress(address: string): Promise<Ip[]> {
    const entities = await writeConnection.manager
      .getRepository(IpEntity)
      .findBy({ address });
    return entities.map((entity) => this.entityToModel(entity));
  }

  async findBySubscriptionId(subscriptionId: string): Promise<Ip> {
    const entity = await writeConnection.manager
      .getRepository(IpEntity)
      .findOneBy({ subscriptionId });
    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Ip): IpEntity {
    const properties = JSON.parse(JSON.stringify(model)) as any;
    return {
      ...properties,
      id: properties.id,
      address: properties.address.address,
      family: properties.address.family,
      // createdAt: properties.cr,
      // deletedAt: properties.deletedAt,
    };
  }

  private entityToModel(entity: IpEntity): Ip {
    return this.ipFactory.reconstitute({
      ...entity,
      id: entity.id,
      subscriptionId: entity.subscriptionId,
      assignment: new Assignment(entity.assignmentId, entity.assignmentType),
      address: new Address(entity.family, entity.address),
    });
  }
}
