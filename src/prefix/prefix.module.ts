import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { NetboxApiModule } from '../../lib/netbox-api/src';
import { PrefixController } from './api/prefix.controller';
import { PrefixFactory } from './domain/prefix.factory';
import { PrefixRepositoryImplement } from './infrastructure/prefix.repository.implement';
import { InjectionToken } from './application/injection.token';
import { PrefixQueryImplement } from './infrastructure/query/prefix.query.implement';
import { PrefixCreateHandler } from './application/command/prefix.create.handler';
import { OrderCreatedHandler } from './application/event/order.created.handler';
import { SubscriptionActivatedHandler } from './application/event/subscription.activated.handler';
import { FindUserPrefixListHandler } from './application/query/find.prefix.list.handler';
import { FindAdminPrefixListHandler } from './application/query/admin/find.prefix.list.handler';
import { PrefixAdminQueryImplement } from './infrastructure/query/admin/prefix.admin.query.implement';

const infrastructure = [
  {
    provide: InjectionToken.PREFIX_REPOSITORY,
    useClass: PrefixRepositoryImplement,
  },
  {
    provide: InjectionToken.PREFIX_QUERY,
    useClass: PrefixQueryImplement,
  },

  {
    provide: InjectionToken.ADMIN_PREFIX_QUERY,
    useClass: PrefixAdminQueryImplement,
  },
];

const application = [
  PrefixCreateHandler,
  OrderCreatedHandler,
  SubscriptionActivatedHandler,
  FindUserPrefixListHandler,
  FindAdminPrefixListHandler,
];

const api = [PrefixController];

@Module({
  imports: [CqrsModule, AuthorizationOnlyModule, NetboxApiModule],
  controllers: [...api],
  providers: [PrefixFactory, ...infrastructure, ...application],
})
export class PrefixModule {}
