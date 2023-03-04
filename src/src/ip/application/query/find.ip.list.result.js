"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FindIpListResult = exports.FindIpListResponse = void 0;
var swagger_1 = require("@nestjs/swagger");
var FindIpListItem = /** @class */ (function () {
    function FindIpListItem() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], FindIpListItem.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], FindIpListItem.prototype, "address");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], FindIpListItem.prototype, "family");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], FindIpListItem.prototype, "dns_name");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], FindIpListItem.prototype, "status");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], FindIpListItem.prototype, "assignmentType");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], FindIpListItem.prototype, "assignmentId");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], FindIpListItem.prototype, "dataCenter");
    return FindIpListItem;
}());
var FindIpListResponse = /** @class */ (function () {
    function FindIpListResponse() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], FindIpListResponse.prototype, "list");
    return FindIpListResponse;
}());
exports.FindIpListResponse = FindIpListResponse;
var FindIpListResult = /** @class */ (function () {
    function FindIpListResult(list) {
        Object.assign(this, list);
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ type: FindIpListItem, isArray: true })
    ], FindIpListResult.prototype, "result");
    return FindIpListResult;
}());
exports.FindIpListResult = FindIpListResult;
