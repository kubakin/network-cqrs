import { Inject } from '@nestjs/common';
import { writeConnection } from '../../../lib/db.module';
import { PrefixRepository } from '../domain/prefix.repository';
import { PrefixFactory } from '../domain/prefix.factory';
import { Prefix } from '../domain/prefix.domain';
import { PrefixEntity } from './prefix.entity';

export class PrefixRepositoryImplement implements PrefixRepository {
  @Inject() private readonly prefixFactory: PrefixFactory;

  async save(data: Prefix | Prefix[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(PrefixEntity).save(entities);
  }

  async findById(id: string): Promise<Prefix | null> {
    const entity = await writeConnection.manager
      .getRepository(PrefixEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Prefix): PrefixEntity {
    const properties = JSON.parse(JSON.stringify(model)) as any;
    return {
      ...properties,
    };
  }

  private entityToModel(entity: PrefixEntity): Prefix {
    return this.prefixFactory.reconstitute({
      ...entity,
    });
  }
}
