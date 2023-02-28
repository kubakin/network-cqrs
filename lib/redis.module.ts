import { CacheModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        store: 'memory',
      }),
    }),
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
  ],

  providers: [],
})
export class RedisModuleAll {}
