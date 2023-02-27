"use strict";
exports.__esModule = true;
exports.CreatedOrderEvent = void 0;
var CreatedOrderEvent = /** @class */ (function () {
    function CreatedOrderEvent(id, invoiceId, family, dataCenter, userId) {
        this.id = id;
        this.invoiceId = invoiceId;
        this.family = family;
        this.dataCenter = dataCenter;
        this.userId = userId;
    }
    return CreatedOrderEvent;
}());
exports.CreatedOrderEvent = CreatedOrderEvent;
