import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { NetboxApiModule } from '../../lib/netbox-api/src';
import { PrefixController } from './api/prefix.controller';
import { PrefixFactory } from './domain/prefix.factory';
import { PrefixRepositoryImplement } from './infrastructure/prefix.repository.implement';
import { InjectionToken } from './application/injection.token';
import { PrefixQueryImplement } from './infrastructure/query/prefix.query.implement';

const infrastructure = [
  {
    provide: InjectionToken.PREFIX_REPOSITORY,
    useClass: PrefixRepositoryImplement,
  },
  {
    provide: InjectionToken.Prefix_QUERY,
    useClass: PrefixQueryImplement,
  },
];

const api = [PrefixController];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule, NetboxApiModule],
  controllers: [...api],
  providers: [PrefixFactory],
})
export class PrefixModule {}
