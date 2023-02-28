import { Injectable, Logger } from '@nestjs/common';
import { IsBoolean, IsInt, IsString, validateSync } from 'class-validator';
import { Type } from 'class-transformer';

@Injectable()
export class Configuration {
  @IsBoolean()
  readonly DATABASE_LOGGING = process.env.DATABASE_LOGGING === 'true';
  @IsString()
  readonly DATABASE_HOST = process.env.DATABASE_HOST as string;
  @IsInt()
  @Type(() => Number)
  readonly DATABASE_PORT = Number(process.env.DATABASE_PORT);
  @IsString()
  readonly DATABASE_NAME = process.env.DATABASE_NAME as string;
  @IsString()
  readonly DATABASE_USER = process.env.DATABASE_USER as string;
  @IsString()
  readonly DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
  @IsBoolean()
  readonly DATABASE_SYNC = process.env.DATABASE_SYNC === 'true';
  @IsInt()
  readonly PORT = Number(process.env.PORT);
  private readonly logger = new Logger(Configuration.name);

  constructor() {
    const error = validateSync(this);
    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
