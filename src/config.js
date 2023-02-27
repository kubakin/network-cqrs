"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Config = void 0;
var common_1 = require("@nestjs/common");
var class_validator_1 = require("class-validator");
var Configuration = /** @class */ (function () {
    function Configuration() {
        this.logger = new common_1.Logger(Configuration.name);
        this.DATABASE_LOGGING = process.env.DATABASE_LOGGING === 'true';
        this.DATABASE_HOST = process.env.DATABASE_HOST;
        this.DATABASE_PORT = Number(process.env.DATABASE_PORT);
        this.DATABASE_NAME = process.env.DATABASE_NAME;
        this.DATABASE_USER = process.env.DATABASE_USER;
        this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
        this.DATABASE_SYNC = process.env.DATABASE_SYNC === 'true';
        this.PORT = Number(process.env.PORT);
        console.log(process.env.DATABASE_SYNC);
        var error = (0, class_validator_1.validateSync)(this);
        if (!error.length)
            return;
        this.logger.error("Config validation error: ".concat(JSON.stringify(error)));
        process.exit(1);
    }
    __decorate([
        (0, class_validator_1.IsBoolean)()
    ], Configuration.prototype, "DATABASE_LOGGING");
    __decorate([
        (0, class_validator_1.IsString)()
    ], Configuration.prototype, "DATABASE_HOST");
    __decorate([
        (0, class_validator_1.IsInt)()
    ], Configuration.prototype, "DATABASE_PORT");
    __decorate([
        (0, class_validator_1.IsString)()
    ], Configuration.prototype, "DATABASE_NAME");
    __decorate([
        (0, class_validator_1.IsString)()
    ], Configuration.prototype, "DATABASE_USER");
    __decorate([
        (0, class_validator_1.IsString)()
    ], Configuration.prototype, "DATABASE_PASSWORD");
    __decorate([
        (0, class_validator_1.IsBoolean)()
    ], Configuration.prototype, "DATABASE_SYNC");
    __decorate([
        (0, class_validator_1.IsInt)()
    ], Configuration.prototype, "PORT");
    return Configuration;
}());
exports.Config = new Configuration();
