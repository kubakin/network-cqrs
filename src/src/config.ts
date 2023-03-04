import { Injectable, Logger } from '@nestjs/common';
import { IsInt, IsString, validateSync } from 'class-validator';
import { Type } from 'class-transformer';

@Injectable()
export class Configuration {
  @IsString()
  readonly DB_HOST = process.env.DB_HOST;
  @IsInt()
  @Type(() => Number)
  readonly DB_PORT = Number(process.env.DB_PORT);
  @IsInt()
  readonly PORT = Number(process.env.PORT);
  private readonly logger = new Logger(Configuration.name);
  @IsString()
  readonly RABBIT_URL = process.env.RABBIT_URL;
  @IsString()
  readonly REDIS_HOST = process.env.REDIS_HOST;
  @IsInt()
  @Type(() => Number)
  readonly REDIS_PORT = Number(process.env.REDIS_PORT);
  @IsString()
  readonly JWT_SECRET = process.env.JWT_SECRET;
  @IsString()
  readonly NETBOX_API_URL = process.env.NETBOX_API_URL;
  @IsString()
  readonly NETBOX_API_TOKEN = process.env.NETBOX_API_TOKEN;
  @IsString()
  readonly ENV = process.env.ENV;

  constructor() {
    const error = validateSync(this);
    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
