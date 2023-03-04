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
    const entities = models.map(model => this.modelToEntity(model));
    await writeConnection.manager.getRepository(IpEntity).save(entities);
  }

  async findUserIpById(id: string, userId: string): Promise<Ip | null> {
    const entity = await writeConnection.manager
      .getRepository(IpEntity)
      .findOneBy({ id, userId, deleted: false, initialized: true });
    return entity ? this.entityToModel(entity) : null;
  }

  async findById(id: string): Promise<Ip | null> {
    const entity = await writeConnection.manager
      .getRepository(IpEntity)
      .findOneBy({ id, initialized: true, deleted: false });
    return entity ? this.entityToModel(entity) : null;
  }

  async findAll(): Promise<Ip[]> {
    const entities = await writeConnection.manager
      .getRepository(IpEntity)
      .find({ where: { deleted: false, initialized: true } });
    return entities.map(entity => this.entityToModel(entity));
  }

  async findByStatus(status: string[]): Promise<Ip[]> {
    const entities = await writeConnection.manager.getRepository(IpEntity).find({
      where: { initialized: true, status: In(status) },
    });
    return entities.map(entity => this.entityToModel(entity));
  }

  async findByAddress(address: string): Promise<Ip[]> {
    const entities = await writeConnection.manager
      .getRepository(IpEntity)
      .findBy({ address, initialized: true, deleted: false });
    return entities.map(entity => this.entityToModel(entity));
  }

  async findByAssignment(assignmentId: string): Promise<Ip[]> {
    const entities = await writeConnection.manager
      .getRepository(IpEntity)
      .find({ where: { assignmentId: assignmentId, initialized: true, deleted: false } });
    return entities.map(entity => this.entityToModel(entity));
  }

  async findBySubscriptionId(subscriptionId: string): Promise<Ip> {
    const entity = await writeConnection.manager.getRepository(IpEntity).findOneBy({ subscriptionId, deleted: false });
    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Ip): IpEntity {
    const properties = JSON.parse(JSON.stringify(model)) as any;
    return {
      ...properties,
      assignmentId: properties?.assignment?.assignmentId,
      assignmentType: properties?.assignment?.assignmentType,
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
