import {
  DynamicModule,
  Global,
  Module,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { IpEntity as Ip } from '../src/ip/infrastructure/ip.entity';
import { Configuration } from '../src/config';

interface WriteConnection {
  readonly startTransaction: (
    level?:
      | 'READ UNCOMMITTED'
      | 'READ COMMITTED'
      | 'REPEATABLE READ'
      | 'SERIALIZABLE',
  ) => Promise<void>;
  readonly commitTransaction: () => Promise<void>;
  readonly rollbackTransaction: () => Promise<void>;
  readonly isTransactionActive: boolean;
  readonly manager: EntityManager;
}

interface ReadConnection {
  readonly getRepository: <T extends ObjectLiteral>(
    target: EntityTarget<T>,
  ) => Repository<T>;
  readonly query: (query: string) => Promise<void>;
  readonly createQueryBuilder: <Entity extends ObjectLiteral>(
    entityClass: EntityTarget<Entity>,
    alias: string,
    queryRunner?: QueryRunner,
  ) => SelectQueryBuilder<Entity>;
}

export let writeConnection = {} as WriteConnection;
export let readConnection = {} as ReadConnection;

class DatabaseService implements OnApplicationBootstrap, OnModuleDestroy {
  configuration: Configuration;
  private readonly dataSource: DataSource;

  constructor() {
    this.configuration = new Configuration();
    this.dataSource = new DataSource({
      type: 'postgres',
      entities: [Ip],
      entityPrefix: 'network',
      logging: this.configuration.DATABASE_LOGGING,
      host: this.configuration.DATABASE_HOST,
      port: this.configuration.DATABASE_PORT,
      database: this.configuration.DATABASE_NAME,
      username: this.configuration.DATABASE_USER,
      password: this.configuration.DATABASE_PASSWORD,
      synchronize: this.configuration.DATABASE_SYNC,
    });
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.dataSource.initialize();
    if (!this.dataSource.isInitialized)
      throw new Error('DataSource is not initialized');
    writeConnection = this.dataSource.createQueryRunner();
    readConnection = this.dataSource.manager;
  }

  async onModuleDestroy(): Promise<void> {
    await this.dataSource.destroy();
  }
}

@Global()
@Module({
  providers: [DatabaseService],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const providers = [DatabaseService];
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
