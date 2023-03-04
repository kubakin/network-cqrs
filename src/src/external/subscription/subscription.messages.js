"use strict";
exports.__esModule = true;
exports.SubscriptionCancel = exports.SubscriptionCreate = exports.SubscriptionCanceled = exports.SubscriptionActivated = exports.InitiatorType = exports.SubscriptionPeriod = exports.SubscriptionType = void 0;
var SubscriptionType;
(function (SubscriptionType) {
    SubscriptionType["HOURLY"] = "hourly";
    SubscriptionType["MONTHLY"] = "monthly";
    SubscriptionType["MONTHLY_ONLY"] = "monthly-only";
})(SubscriptionType = exports.SubscriptionType || (exports.SubscriptionType = {}));
var SubscriptionPeriod;
(function (SubscriptionPeriod) {
    SubscriptionPeriod[SubscriptionPeriod["MONTH"] = 1] = "MONTH";
    SubscriptionPeriod[SubscriptionPeriod["MONTH3"] = 3] = "MONTH3";
    SubscriptionPeriod[SubscriptionPeriod["MONTH6"] = 6] = "MONTH6";
    SubscriptionPeriod[SubscriptionPeriod["MONTH12"] = 12] = "MONTH12";
})(SubscriptionPeriod = exports.SubscriptionPeriod || (exports.SubscriptionPeriod = {}));
var InitiatorType;
(function (InitiatorType) {
    InitiatorType["INTERNAL"] = "internal";
    InitiatorType["ADMIN"] = "admin";
    InitiatorType["USER"] = "user";
    InitiatorType["NO_FUNDS"] = "no_funds";
})(InitiatorType = exports.InitiatorType || (exports.InitiatorType = {}));
//balance.event.subscription.activated
var SubscriptionActivated = /** @class */ (function () {
    function SubscriptionActivated() {
    }
    return SubscriptionActivated;
}());
exports.SubscriptionActivated = SubscriptionActivated;
//balance.event.subscription.canceled
var SubscriptionCanceled = /** @class */ (function () {
    function SubscriptionCanceled() {
    }
    return SubscriptionCanceled;
}());
exports.SubscriptionCanceled = SubscriptionCanceled;
//balance.command.subscription.create
var SubscriptionCreate = /** @class */ (function () {
    function SubscriptionCreate() {
    }
    return SubscriptionCreate;
}());
exports.SubscriptionCreate = SubscriptionCreate;
//balance.command.subscription.cancel
var SubscriptionCancel = /** @class */ (function () {
    function SubscriptionCancel() {
    }
    return SubscriptionCancel;
}());
exports.SubscriptionCancel = SubscriptionCancel;
