"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IpFactory = void 0;
var common_1 = require("@nestjs/common");
var cqrs_1 = require("@nestjs/cqrs");
var ip_domain_1 = require("./ip.domain");
var address_1 = require("./enitites/address");
var IpFactory = /** @class */ (function () {
    function IpFactory() {
    }
    IpFactory.prototype.createOrder = function (options) {
        return this.eventPublisher.mergeObjectContext(new ip_domain_1.IpDomain(__assign(__assign({}, options), { address: new address_1.Address(options.family, options.address), status: 'created', deleted: false, subscriptionId: options.subscriptionId, initialized: false, assignment: null })));
    };
    IpFactory.prototype.createAddress = function (options) {
        return this.eventPublisher.mergeObjectContext(new ip_domain_1.IpDomain(__assign(__assign({}, options), { address: new address_1.Address(options.family, options.address), status: 'active', deleted: false, subscriptionId: options.subscriptionId, initialized: true, assignment: null })));
    };
    IpFactory.prototype.reconstitute = function (properties) {
        return this.eventPublisher.mergeObjectContext(new ip_domain_1.IpDomain(properties));
    };
    __decorate([
        (0, common_1.Inject)(cqrs_1.EventPublisher)
    ], IpFactory.prototype, "eventPublisher");
    return IpFactory;
}());
exports.IpFactory = IpFactory;
