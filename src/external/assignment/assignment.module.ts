import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UnassignRequestedHandler } from './event/unassign.requested.handler';
import { UnassignConfirmedHandler } from './event/unassign.confirmed.handler';
import { AssignConfirmedHandler } from './event/assign.confirmed.handler';
import { UnassignFailedHandler } from './event/unassign.failed.handler';
import { AssignFailedHandler } from './event/assign.failed.handler';
import { AssignRequestedHandler } from './event/assign.requested.handler';
import { AssignmentExternalController } from './api/assignment.external.controller';

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
    AssignFailedHandler,
    UnassignFailedHandler,
    AssignRequestedHandler,
    UnassignRequestedHandler,
    UnassignConfirmedHandler,
    AssignConfirmedHandler,
    AssignmentExternalController,
  ],
})
export class AssignmentModule {}
