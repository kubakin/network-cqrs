"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.IpModule = void 0;
var common_1 = require("@nestjs/common");
var cqrs_1 = require("@nestjs/cqrs");
var ip_factory_1 = require("./domain/ip.factory");
var injection_token_1 = require("./application/injection.token");
var ip_repository_implement_1 = require("./infrastructure/ip.repository.implement");
var unassign_request_handler_1 = require("./application/command/unassign.request.handler");
var ip_controller_1 = require("./api/ip/ip.controller");
var create_order_handler_1 = require("./application/command/create.order.handler");
var created_order_handler_1 = require("./application/event/created.order.handler");
var find_ip_list_handler_1 = require("./application/query/find.ip.list.handler");
var ip_query_implement_1 = require("./infrastructure/query/ip.query.implement");
var subscription_activated_handler_1 = require("./application/event/subscription.activated.handler");
var subscription_canceled_handler_1 = require("./application/event/subscription.canceled.handler");
var infrastructure = [
    {
        provide: injection_token_1.InjectionToken.IP_REPOSITORY,
        useClass: ip_repository_implement_1.IpRepositoryImplement
    },
    {
        provide: injection_token_1.InjectionToken.IP_QUERY,
        useClass: ip_query_implement_1.IpQueryImplement
    },
];
var applications = [
    unassign_request_handler_1.UnassignRequestHandler,
    create_order_handler_1.CreateOrderHandler,
    created_order_handler_1.CreatedOrderHandler,
    find_ip_list_handler_1.FindIpListHandler,
    subscription_activated_handler_1.SubscriptionActivatedHandler,
    subscription_canceled_handler_1.SubscriptionCanceledHandler,
];
var api = [ip_controller_1.IpController];
var IpModule = /** @class */ (function () {
    function IpModule() {
    }
    IpModule = __decorate([
        (0, common_1.Module)({
            imports: [cqrs_1.CqrsModule],
            controllers: __spreadArray([], api, true),
            providers: __spreadArray(__spreadArray([ip_factory_1.IpFactory], infrastructure, true), applications, true),
            exports: []
        })
    ], IpModule);
    return IpModule;
}());
exports.IpModule = IpModule;
