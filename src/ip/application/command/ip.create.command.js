"use strict";
exports.__esModule = true;
exports.IpCreateCommand = void 0;
var IpCreateCommand = /** @class */ (function () {
    function IpCreateCommand(id, userId, dataCenter, family, primary, subscriptionId, address, prefix) {
        this.id = id;
        this.userId = userId;
        this.dataCenter = dataCenter;
        this.family = family;
        this.primary = primary;
        this.subscriptionId = subscriptionId;
        this.address = address;
        this.prefix = prefix;
    }
    return IpCreateCommand;
}());
exports.IpCreateCommand = IpCreateCommand;
