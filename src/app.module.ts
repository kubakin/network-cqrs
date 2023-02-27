import { Module } from '@nestjs/common';
import { IpModule } from './ip/ip.module';
import { PrefixModule } from './prefix/prefix.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DatabaseModule } from '../lib/db.module';
import { NetboxApiModule } from '../lib/netbox-api/src';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from './external/subscription/subscription.module';
import { AssignmentModule } from './external/assignment/assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    NetboxApiModule,
    SubscriptionModule,
    AssignmentModule,
    IpModule,
    PrefixModule,
    ScheduleModule.forRoot(),
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
    DatabaseModule,
  ],
  controllers: [],
  providers: [NetboxApiModule],
  exports: [NetboxApiModule],
})
export class AppModule {}
