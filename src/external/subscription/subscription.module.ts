import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SubscriptionExternalService } from './external/subscription.external.service';
import { SubscriptionCancelHandler } from './command/subscription.cancel.handler';
import { SubscriptionCreateHandler } from './command/subscription.create.handler';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    CqrsModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'client',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [],
  providers: [
    SubscriptionExternalService,
    SubscriptionCancelHandler,
    SubscriptionCreateHandler,
  ],
})
export class SubscriptionModule {}
