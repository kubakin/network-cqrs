import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SubscriptionExternalService } from './external/subscription.external.service';
import { SubscriptionCancelHandler } from './command/subscription.cancel.handler';
import { SubscriptionCreateHandler } from './command/subscription.create.handler';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { SubscriptionDeleteProcessStartedHandler } from './event/subscription.delete.process.started.handler';

@Module({
  imports: [
    CqrsModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [],
      useFactory: () => ({
        connectionInitOptions: { timeout: 20_000 },
        exchanges: [
          {
            name: 'client',
            type: 'topic',
          },
        ],
        uri: process.env.RABBIT_URL.split(','),
      }),
    }),
  ],
  controllers: [],
  providers: [
    SubscriptionExternalService,
    SubscriptionCancelHandler,
    SubscriptionCreateHandler,
    SubscriptionDeleteProcessStartedHandler,
  ],
})
export class SubscriptionModule {}
