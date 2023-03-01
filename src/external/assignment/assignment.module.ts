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
