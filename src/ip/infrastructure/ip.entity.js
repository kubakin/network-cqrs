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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IpEntity = exports.IpCreateAnnouncedEntity = exports.IpCreatePrimaryEntity = exports.IpCreateCustomerEntity = exports.AssignmentType = void 0;
var typeorm_1 = require("typeorm");
var AssignmentType;
(function (AssignmentType) {
    AssignmentType["vm"] = "vm";
    AssignmentType["ds"] = "ds";
})(AssignmentType = exports.AssignmentType || (exports.AssignmentType = {}));
var IpCreateCustomerEntity = /** @class */ (function () {
    function IpCreateCustomerEntity() {
    }
    return IpCreateCustomerEntity;
}());
exports.IpCreateCustomerEntity = IpCreateCustomerEntity;
var IpCreatePrimaryEntity = /** @class */ (function () {
    function IpCreatePrimaryEntity() {
    }
    return IpCreatePrimaryEntity;
}());
exports.IpCreatePrimaryEntity = IpCreatePrimaryEntity;
var IpCreateAnnouncedEntity = /** @class */ (function () {
    function IpCreateAnnouncedEntity() {
    }
    return IpCreateAnnouncedEntity;
}());
exports.IpCreateAnnouncedEntity = IpCreateAnnouncedEntity;
var IpEntity = /** @class */ (function (_super) {
    __extends(IpEntity, _super);
    function IpEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], IpEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('inet', { nullable: true, unique: false })
    ], IpEntity.prototype, "address");
    __decorate([
        (0, typeorm_1.Column)()
    ], IpEntity.prototype, "family");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], IpEntity.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], IpEntity.prototype, "dns_name");
    __decorate([
        (0, typeorm_1.Column)({ "default": 'active' })
    ], IpEntity.prototype, "status");
    __decorate([
        (0, typeorm_1.Column)('uuid', { nullable: true })
    ], IpEntity.prototype, "userId");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": AssignmentType, nullable: true })
    ], IpEntity.prototype, "assignmentType");
    __decorate([
        (0, typeorm_1.Column)({ type: 'uuid', nullable: true })
    ], IpEntity.prototype, "assignmentId");
    __decorate([
        (0, typeorm_1.Column)('uuid', { nullable: true })
    ], IpEntity.prototype, "subscriptionId");
    __decorate([
        (0, typeorm_1.Column)('boolean', { "default": false })
    ], IpEntity.prototype, "primary");
    __decorate([
        (0, typeorm_1.Column)('varchar', { "default": 'Xelent' })
    ], IpEntity.prototype, "dataCenter");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], IpEntity.prototype, "dataCenterId");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], IpEntity.prototype, "initialized");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], IpEntity.prototype, "deleted");
    IpEntity = __decorate([
        (0, typeorm_1.Entity)('network_ip')
    ], IpEntity);
    return IpEntity;
}(typeorm_1.BaseEntity));
exports.IpEntity = IpEntity;
