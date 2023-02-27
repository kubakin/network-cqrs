"use strict";
exports.__esModule = true;
exports.CreateOrderCommand = void 0;
var CreateOrderCommand = /** @class */ (function () {
    function CreateOrderCommand(id, family, dataCenter, invoiceId, primary, userId) {
        this.id = id;
        this.family = family;
        this.dataCenter = dataCenter;
        this.invoiceId = invoiceId;
        this.primary = primary;
        this.userId = userId;
    }
    return CreateOrderCommand;
}());
exports.CreateOrderCommand = CreateOrderCommand;
