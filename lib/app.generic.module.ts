import { ConfigModule } from '@nestjs/config';
import { CacheModule, DynamicModule, Global, Module } from '@nestjs/common';
import { DatabaseModule } from './db.module';
import { Configuration } from '../src/config';
import { ScheduleModule } from '@nestjs/schedule';

@Global()
@Module({})
export class AppGenericModule {
  static getModules() {
    const modules = [ScheduleModule.forRoot()];
    modules.push(
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath:
          process.env.DEV === 'true' ? ['.env.dev', '.env.local'] : [],
        ignoreEnvFile: process.env.DEV !== 'true',
      }),
    );
    modules.push(DatabaseModule.forRoot());
    modules.push(CacheModule.register({ isGlobal: true }));
    return modules;
  }

  static forRoot(): DynamicModule {
    return {
      global: true,
      module: AppGenericModule,
      imports: this.getModules(),
      exports: [],
      providers: [Configuration],
    };
  }
}
