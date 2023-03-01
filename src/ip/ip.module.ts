import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { IpFactory } from './domain/ip.factory';
import { InjectionToken } from './application/injection.token';
import { IpRepositoryImplement } from './infrastructure/ip.repository.implement';
import { UnassignRequestHandler } from './application/command/unassign.request.handler';
import { IpController } from './api/ip/ip.controller';
import { CreateOrderHandler } from './application/command/create.order.handler';
import { CreatedOrderHandler } from './application/event/created.order.handler';
import { IpQueryImplement } from './infrastructure/query/ip.query.implement';
import { SubscriptionActivatedHandler } from './application/event/subscription.activated.handler';
import { SubscriptionCanceledHandler } from './application/event/subscription.canceled.handler';
import { AuthorizationOnlyModule } from '../../lib/authorization/src';
import { IpCreateHandler } from './application/command/ip.create.handler';
import { NetboxService } from './infrastructure/integration/netbox.service';
import { NetboxApi, NetboxApiModule } from '../../lib/netbox-api/src';
import { IpManagerService } from './application/services/ip.manager.service';
import { AssignConfirmedHandler } from './application/event/assign.confirmed.handler';
import { UnassignConfirmedHandler } from './application/event/unassign.confirmed.handler';
import { AssignFailedHandler } from './application/event/assign.failed.handler';
import { UnassignFailedHandler } from './application/event/unassign.failed.handler';
import { AssignRequestHandler } from './application/command/assign.request.handler';
import { AssignmentResetHandler } from './application/command/assignment.reset.handler';
import { DeleteRequestHandler } from './application/command/delete.request.handler';
import { FindUserIpListHandler } from './application/query/find.ip.list.handler';
import { IpAdminQueryImplement } from './infrastructure/query/ip.admin.query.implement';
import { FindAdminIpListHandler } from './application/query/admin/find.ip.list.handler';
import { IpAdminController } from './api/ip/ip.admin.controller';
import { DeleteRequestedHandler } from './application/event/delete.requested.handler';
import { RedisModule, RedisService } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';
import { RedisLockModule } from '@huangang/nestjs-simple-redis-lock/index';

const infrastructure = [
  {
    provide: InjectionToken.IP_REPOSITORY,
    useClass: IpRepositoryImplement,
  },
  {
    provide: InjectionToken.IP_QUERY,
    useClass: IpQueryImplement,
  },

  {
    provide: InjectionToken.ADMIN_IP_QUERY,
    useClass: IpAdminQueryImplement,
  },
];

const applications = [
  UnassignRequestHandler,
  CreateOrderHandler,
  CreatedOrderHandler,
  FindUserIpListHandler,
  SubscriptionActivatedHandler,
  SubscriptionCanceledHandler,
  IpCreateHandler,
  IpManagerService,
  AssignConfirmedHandler,
  UnassignConfirmedHandler,
  AssignFailedHandler,
  UnassignFailedHandler,
  AssignRequestHandler,
  AssignmentResetHandler,
  DeleteRequestHandler,
  FindAdminIpListHandler,
  DeleteRequestedHandler,
];
const api = [IpController, IpAdminController];

@Module({
  imports: [
    CqrsModule,
    AuthorizationOnlyModule,
    NetboxApiModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        name: 'default',
        url: `${configService.get<string>(
          'REDIS_HOST',
        )}:${configService.get<string>('REDIS_PORT')}`,
      }),
    }),
    RedisLockModule.registerAsync({
      inject: [RedisService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (service: RedisService) => {
        return { prefix: ':lock:', client: service.getClient() };
      },
    }),
  ],
  controllers: [...api],
  providers: [
    NetboxService,
    NetboxApi,
    IpFactory,
    ...infrastructure,
    ...applications,
  ],
  exports: [],
})
export class IpModule {}
