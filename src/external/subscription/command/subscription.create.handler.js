"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscriptionCreateHandler = void 0;
var cqrs_1 = require("@nestjs/cqrs");
var subscription_create_command_1 = require("./subscription.create.command");
var SubscriptionCreateHandler = /** @class */ (function () {
    function SubscriptionCreateHandler(amqpConnection) {
        this.amqpConnection = amqpConnection;
        this.route = 'balance.command.subscription.create';
    }
    SubscriptionCreateHandler.prototype.execute = function (command) {
        console.log('before publish');
        return this.amqpConnection.publish('client', this.route, {
            name: this.route,
            data: command.create
        });
    };
    SubscriptionCreateHandler = __decorate([
        (0, cqrs_1.CommandHandler)(subscription_create_command_1.SubscriptionCreateCommand)
    ], SubscriptionCreateHandler);
    return SubscriptionCreateHandler;
}());
exports.SubscriptionCreateHandler = SubscriptionCreateHandler;
