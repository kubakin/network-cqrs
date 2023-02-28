import { Module } from '@nestjs/common';
import { IpModule } from './ip/ip.module';
import { PrefixModule } from './prefix/prefix.module';
import { SubscriptionModule } from './external/subscription/subscription.module';
import { AssignmentModule } from './external/assignment/assignment.module';
import { DataCenterModule } from './data-center/data-center.module';
import { AppGenericModule } from '../lib/app.generic.module';

@Module({
  imports: [
    AppGenericModule.forRoot(),
    SubscriptionModule,
    AssignmentModule,
    IpModule,
    PrefixModule,
    DataCenterModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
