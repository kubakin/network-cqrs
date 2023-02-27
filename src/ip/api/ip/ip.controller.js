"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.IpController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var create_order_command_1 = require("../../application/command/create.order.command");
var typeorm_1 = require("@nestjs/typeorm");
var find_ip_list_query_1 = require("../../application/query/find.ip.list.query");
var find_ip_list_result_1 = require("../../application/query/find.ip.list.result");
var IpController = /** @class */ (function () {
    function IpController(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    IpController.prototype.ipBuy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = new create_order_command_1.CreateOrderCommand((0, typeorm_1.generateString)(), 4, 'Xelent', (0, typeorm_1.generateString)(), false, (0, typeorm_1.generateString)());
                        return [4 /*yield*/, this.commandBus.execute(command)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IpController.prototype.dcList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    IpController.prototype.ipList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = new find_ip_list_query_1.FindIpListQuery({});
                        return [4 /*yield*/, this.queryBus.execute(query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.result];
                }
            });
        });
    };
    IpController.prototype.ipDelete = function (id) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    IpController.prototype.ipAssign = function (id) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    IpController.prototype.ipDeassign = function (id) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    IpController.prototype.ipPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, '150'];
            });
        });
    };
    IpController.prototype.freeAddressFromPrefix = function (prefixId) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    IpController.prototype.getOutFromPrefix = function (prefixId) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    __decorate([
        (0, common_1.Post)('/')
    ], IpController.prototype, "ipBuy");
    __decorate([
        (0, common_1.Get)('network-dc')
    ], IpController.prototype, "dcList");
    __decorate([
        (0, common_1.Get)('/'),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            type: find_ip_list_result_1.FindIpListResult
        })
    ], IpController.prototype, "ipList");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], IpController.prototype, "ipDelete");
    __decorate([
        (0, common_1.Post)(':id/assign'),
        __param(0, (0, common_1.Param)('id'))
    ], IpController.prototype, "ipAssign");
    __decorate([
        (0, common_1.Post)(':id/deassign'),
        __param(0, (0, common_1.Param)('id'))
    ], IpController.prototype, "ipDeassign");
    __decorate([
        (0, common_1.Get)('/price')
    ], IpController.prototype, "ipPrice");
    __decorate([
        (0, common_1.Get)('/free/:prefixId'),
        __param(0, (0, common_1.Param)('prefixId'))
    ], IpController.prototype, "freeAddressFromPrefix");
    __decorate([
        (0, common_1.Post)('/get-out/:prefixId'),
        __param(0, (0, common_1.Param)('prefixId'))
    ], IpController.prototype, "getOutFromPrefix");
    IpController = __decorate([
        (0, common_1.Controller)('/api/ipam/ip'),
        (0, swagger_1.ApiTags)('network')
    ], IpController);
    return IpController;
}());
exports.IpController = IpController;
