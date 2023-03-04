import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UnassignRequestedHandler } from './event/unassign.requested.handler';
import { AssignRequestedHandler } from './event/assign.requested.handler';
import { AssignmentExternalController } from './api/assignment.external.controller';
import { AssignmentProcessHandler } from './event/assignment.process.handler';

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
    // AssignFailedHandler,
    // UnassignFailedHandler,
    AssignRequestedHandler,
    UnassignRequestedHandler,
    // UnassignConfirmedHandler,
    // AssignConfirmedHandler,
    AssignmentProcessHandler,
    AssignmentExternalController,
  ],
})
export class AssignmentModule {}
