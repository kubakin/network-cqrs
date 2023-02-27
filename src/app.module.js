"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var ip_module_1 = require("./ip/ip.module");
var prefix_module_1 = require("./prefix/prefix.module");
var schedule_1 = require("@nestjs/schedule");
var nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
var subscription_module_1 = require("./subscription/subscription.module");
var db_module_1 = require("../lib/db.module");
var src_1 = require("../lib/netbox-api/src");
var config_1 = require("@nestjs/config");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: '.env'
                }),
                src_1.NetboxApiModule,
                subscription_module_1.SubscriptionModule,
                ip_module_1.IpModule,
                prefix_module_1.PrefixModule,
                schedule_1.ScheduleModule.forRoot(),
                nestjs_rabbitmq_1.RabbitMQModule.forRoot(nestjs_rabbitmq_1.RabbitMQModule, {
                    exchanges: [
                        {
                            name: 'client',
                            type: 'topic'
                        },
                    ],
                    uri: 'amqp://localhost:5672',
                    connectionInitOptions: { wait: false }
                }),
                db_module_1.DatabaseModule,
            ],
            controllers: [],
            providers: [src_1.NetboxApiModule],
            exports: [src_1.NetboxApiModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
