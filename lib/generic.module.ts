import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class GenericModule {
  static getModules() {
    const modules = [];
    // modules.push(
    //   ConfigModule.forRoot({
    //     isGlobal: true,
    //     envFilePath:
    //       process.env.DEV === 'true' ? ['.env.dev', '.env.local'] : [],
    //     ignoreEnvFile: process.env.DEV !== 'true',
    //   }),
    // );
    return modules;
  }

  static forRoot(): DynamicModule {
    return {
      module: GenericModule,
      imports: this.getModules(),
      exports: [],
      providers: [],
    };
  }
}
