"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.IpDomain = exports.Ip = void 0;
var cqrs_1 = require("@nestjs/cqrs");
var created_order_event_1 = require("../application/event/created.order.event");
var Ip = /** @class */ (function () {
    function Ip() {
    }
    return Ip;
}());
exports.Ip = Ip;
var IpDomain = /** @class */ (function (_super) {
    __extends(IpDomain, _super);
    function IpDomain(properties) {
        var _this = _super.call(this) || this;
        Object.assign(_this, properties);
        return _this;
    }
    IpDomain.prototype.initialize = function (address) { };
    IpDomain.prototype.created = function () {
        this.apply(new created_order_event_1.CreatedOrderEvent(this.id, this.subscriptionId, this.address.family, this.dataCenter, this.userId));
    };
    IpDomain.prototype.getDataCenter = function () {
        return this.dataCenter;
    };
    IpDomain.prototype.getId = function () {
        return this.id;
    };
    IpDomain.prototype.getAddress = function () {
        return this.address;
    };
    IpDomain.prototype.getOwner = function () {
        return this.userId;
    };
    IpDomain.prototype.getSubscriptionId = function () {
        return this.subscriptionId;
    };
    IpDomain.prototype.unnassigned = function () { };
    IpDomain.prototype.assigned = function () { };
    IpDomain.prototype.unnassignRequested = function () { };
    IpDomain.prototype.assignRequested = function () {
        // this.actionSuccess();
    };
    return IpDomain;
}(cqrs_1.AggregateRoot));
exports.IpDomain = IpDomain;
