"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthorizationOnlyModule = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var jwt_1 = require("@nestjs/jwt");
var jwt_strategy_1 = require("./jwt/jwt.strategy");
var config_1 = require("@nestjs/config");
var AuthorizationOnlyModule = /** @class */ (function () {
    function AuthorizationOnlyModule() {
    }
    AuthorizationOnlyModule = __decorate([
        (0, common_1.Module)({
            imports: [
                passport_1.PassportModule,
                jwt_1.JwtModule.registerAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        secret: configService.get('JWT_SECRET')
                    }); }
                }),
            ],
            providers: [
                {
                    provide: jwt_strategy_1.JwtStrategy,
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return new jwt_strategy_1.JwtStrategy(configService.get('JWT_SECRET')); }
                },
            ],
            exports: [jwt_1.JwtModule]
        })
    ], AuthorizationOnlyModule);
    return AuthorizationOnlyModule;
}());
exports.AuthorizationOnlyModule = AuthorizationOnlyModule;
