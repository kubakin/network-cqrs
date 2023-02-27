"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscriptionModule = void 0;
var common_1 = require("@nestjs/common");
var cqrs_1 = require("@nestjs/cqrs");
var subscription_external_service_1 = require("./external/subscription.external.service");
var subscription_cancel_handler_1 = require("./command/subscription.cancel.handler");
var subscription_create_handler_1 = require("./command/subscription.create.handler");
var nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
var SubscriptionModule = /** @class */ (function () {
    function SubscriptionModule() {
    }
    SubscriptionModule = __decorate([
        (0, common_1.Module)({
            imports: [
                cqrs_1.CqrsModule,
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
            ],
            controllers: [],
            providers: [
                subscription_external_service_1.SubscriptionExternalService,
                subscription_cancel_handler_1.SubscriptionCancelHandler,
                subscription_create_handler_1.SubscriptionCreateHandler,
            ]
        })
    ], SubscriptionModule);
    return SubscriptionModule;
}());
exports.SubscriptionModule = SubscriptionModule;
