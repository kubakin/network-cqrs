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
exports.NetboxApi = exports.NetboxNotFoundApiException = exports.NetboxApiException = void 0;
var common_1 = require("@nestjs/common");
var netbox_nodejs_api_1 = require("@yoldi/netbox-nodejs-api");
var axios_1 = require("axios");
var runtime_exception_1 = require("@nestjs/core/errors/exceptions/runtime.exception");
var plugins_api_1 = require("./plugins.api");
var NetboxApiException = /** @class */ (function (_super) {
    __extends(NetboxApiException, _super);
    function NetboxApiException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NetboxApiException;
}(Error));
exports.NetboxApiException = NetboxApiException;
var NetboxNotFoundApiException = /** @class */ (function (_super) {
    __extends(NetboxNotFoundApiException, _super);
    function NetboxNotFoundApiException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NetboxNotFoundApiException;
}(NetboxApiException));
exports.NetboxNotFoundApiException = NetboxNotFoundApiException;
var NetboxApi = /** @class */ (function () {
    function NetboxApi() {
        var _this = this;
        this.logger = new common_1.Logger(this.constructor.name);
        var token = process.env.NETBOX_API_TOKEN;
        if (!token) {
            throw new runtime_exception_1.RuntimeException('Netbox token is not found');
        }
        this.configuration = new netbox_nodejs_api_1.Configuration({
            basePath: process.env.NETBOX_API_URL,
            baseOptions: {
                headers: {
                    Authorization: "Token ".concat(token)
                }
            }
        });
        this.axios = axios_1["default"].create({
        // paramsSerializer: (params) => {
        //   return qs.stringify(params, { arrayFormat: 'repeat' });
        // },
        });
        this.circuits = new netbox_nodejs_api_1.CircuitsApi(this.configuration, undefined, this.axios);
        this.dcim = new netbox_nodejs_api_1.DcimApi(this.configuration, undefined, this.axios);
        this.extras = new netbox_nodejs_api_1.ExtrasApi(this.configuration, undefined, this.axios);
        this.ipam = new netbox_nodejs_api_1.IpamApi(this.configuration, undefined, this.axios);
        this.secrets = new netbox_nodejs_api_1.SecretsApi(this.configuration, undefined, this.axios);
        this.status = new netbox_nodejs_api_1.StatusApi(this.configuration, undefined, this.axios);
        this.tenancy = new netbox_nodejs_api_1.TenancyApi(this.configuration, undefined, this.axios);
        this.users = new netbox_nodejs_api_1.UsersApi(this.configuration, undefined, this.axios);
        this.virtualization = new netbox_nodejs_api_1.VirtualizationApi(this.configuration, undefined, this.axios);
        this.plugins = new plugins_api_1.PluginsApi(this.configuration, undefined, this.axios);
        this.axios.interceptors.response.use(function (request) {
            return request;
        }, function (err) {
            var _a, _b, _c, _d, _e;
            // eslint-disable-next-line @typescript-eslint/unbound-method
            if ((_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.find) === null || _c === void 0 ? void 0 : _c.call(_b, function (it) { var _a; return (_a = it.includes) === null || _a === void 0 ? void 0 : _a.call(it, 'Invalid session key'); })) {
            }
            _this.logger.warn('Netbox request failed: ' +
                (JSON.stringify((_d = err === null || err === void 0 ? void 0 : err.response) === null || _d === void 0 ? void 0 : _d.data) || err) +
                '\n Request: ' +
                JSON.stringify(err.config));
            throw new common_1.BadRequestException(JSON.stringify((_e = err === null || err === void 0 ? void 0 : err.response) === null || _e === void 0 ? void 0 : _e.data) || err);
        });
        this.axios.interceptors.request.use(function (request) {
            _this.logger.debug("Send request: ".concat(request.method.toUpperCase(), " ").concat(request.url));
            return request;
        });
        this.axios.interceptors.response.use(function (response) {
            var _a, _b;
            var statusCode = (_a = response.status) === null || _a === void 0 ? void 0 : _a.toString();
            if (!statusCode) {
                statusCode = (_b = response.response) === null || _b === void 0 ? void 0 : _b.status.toString();
            }
            if (statusCode && !(statusCode === null || statusCode === void 0 ? void 0 : statusCode.startsWith('2'))) {
                if (statusCode === '404') {
                    throw new NetboxNotFoundApiException(response.statusText);
                }
                throw new NetboxApiException(response.data);
            }
            return response;
        });
        this.axios.interceptors.request.use(function (config) {
            return new Promise(function (resolve, reject) {
                var interval = setInterval(function () {
                    if (NetboxApi_1.PENDING_REQUESTS < NetboxApi_1.MAX_REQUESTS_COUNT) {
                        NetboxApi_1.PENDING_REQUESTS++;
                        clearInterval(interval);
                        resolve(config);
                    }
                }, NetboxApi_1.INTERVAL_MS);
            });
        });
        this.axios.interceptors.response.use(function (response) {
            NetboxApi_1.PENDING_REQUESTS = Math.max(0, NetboxApi_1.PENDING_REQUESTS - 1);
            return Promise.resolve(response);
        }, function (error) {
            NetboxApi_1.PENDING_REQUESTS = Math.max(0, NetboxApi_1.PENDING_REQUESTS - 1);
            return Promise.reject(error);
        });
    }
    NetboxApi_1 = NetboxApi;
    var NetboxApi_1;
    NetboxApi.MAX_REQUESTS_COUNT = 10;
    NetboxApi.INTERVAL_MS = 10;
    NetboxApi.PENDING_REQUESTS = 0;
    NetboxApi = NetboxApi_1 = __decorate([
        (0, common_1.Injectable)()
    ], NetboxApi);
    return NetboxApi;
}());
exports.NetboxApi = NetboxApi;
