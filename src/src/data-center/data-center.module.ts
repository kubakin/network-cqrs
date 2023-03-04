import { Module } from '@nestjs/common';
import { DataCenterRepository } from './services/data-center.repository';
import { DataCenterProvider } from './services/data-center.provider';
import { DataCenterController } from './api/data-center.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
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
  controllers: [DataCenterController],
  providers: [DataCenterRepository, DataCenterProvider],
})
export class DataCenterModule {}
