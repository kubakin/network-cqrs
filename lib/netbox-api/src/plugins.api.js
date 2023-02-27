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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.PluginsApi = exports.SecretsApiFactory = exports.SecretsApiFp = exports.SecretsApiAxiosParamCreator = void 0;
var base_1 = require("@yoldi/netbox-nodejs-api/dist/base");
var common_1 = require("@yoldi/netbox-nodejs-api/dist/common");
var axios_1 = require("axios");
var SecretsApiAxiosParamCreator = function (configuration) {
    var _this = this;
    return {
        /**
         * {         \"public_key\": \"<public key>\",         \"private_key\": \"<private key>\"     }
         * @summary This endpoint can be used to generate a new RSA key pair. The keys are returned in PEM format.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsGenerateRsaKeyPairList: function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            localVarPath = "/plugins/netbox_secretstore/generate-rsa-key-pair/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'GET' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         * Retrieve a temporary session key to use for encrypting and decrypting secrets via the API. The user\'s private RSA key is POSTed with the name `private_key`. An example:      curl -v -X POST -H \"Authorization: Token <token>\" -H \"Accept: application/json; indent=4\" \\     --data-urlencode \"private_key@<filename>\" https://netbox/api/plugins/netbox_secretstore/get-session-key/  This request will yield a base64-encoded session key to be included in an `X-Session-Key` header in future requests:      {         \"session_key\": \"+8t4SI6XikgVmB5+/urhozx9O5qCQANyOk1MNe6taRf=\"     }  This endpoint accepts one optional parameter: `preserve_key`. If True and a session key exists, the existing session key will be returned instead of a new one.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsGetSessionKeyCreate: function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            localVarPath = "/plugins/netbox_secretstore/get-session-key/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'POST' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesBulkDelete: function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            localVarPath = "/plugins/netbox_secretstore/secret-roles/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'DELETE' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesBulkPartialUpdate: function (data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretRolesBulkPartialUpdate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secret-roles/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'PATCH' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesBulkUpdate: function (data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretRolesBulkUpdate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secret-roles/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'PUT' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesCreate: function (data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretRolesCreate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secret-roles/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'POST' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesDelete: function (id, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'id' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretRolesDelete', 'id', id);
                            localVarPath = "/plugins/netbox_secretstore/secret-roles/{id}/"
                                .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'DELETE' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {string} [id]
         * @param {string} [name]
         * @param {string} [slug]
         * @param {string} [q]
         * @param {string} [idN]
         * @param {string} [idLte]
         * @param {string} [idLt]
         * @param {string} [idGte]
         * @param {string} [idGt]
         * @param {string} [nameN]
         * @param {string} [nameIc]
         * @param {string} [nameNic]
         * @param {string} [nameIew]
         * @param {string} [nameNiew]
         * @param {string} [nameIsw]
         * @param {string} [nameNisw]
         * @param {string} [nameIe]
         * @param {string} [nameNie]
         * @param {string} [slugN]
         * @param {string} [slugIc]
         * @param {string} [slugNic]
         * @param {string} [slugIew]
         * @param {string} [slugNiew]
         * @param {string} [slugIsw]
         * @param {string} [slugNisw]
         * @param {string} [slugIe]
         * @param {string} [slugNie]
         * @param {number} [limit] Number of results to return per page.
         * @param {number} [offset] The initial index from which to return the results.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesList: function (id, name, slug, q, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, slugN, slugIc, slugNic, slugIew, slugNiew, slugIsw, slugNisw, slugIe, slugNie, limit, offset, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            localVarPath = "/plugins/netbox_secretstore/secret-roles/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'GET' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            if (id !== undefined) {
                                localVarQueryParameter['id'] = id;
                            }
                            if (name !== undefined) {
                                localVarQueryParameter['name'] = name;
                            }
                            if (slug !== undefined) {
                                localVarQueryParameter['slug'] = slug;
                            }
                            if (q !== undefined) {
                                localVarQueryParameter['q'] = q;
                            }
                            if (idN !== undefined) {
                                localVarQueryParameter['id__n'] = idN;
                            }
                            if (idLte !== undefined) {
                                localVarQueryParameter['id__lte'] = idLte;
                            }
                            if (idLt !== undefined) {
                                localVarQueryParameter['id__lt'] = idLt;
                            }
                            if (idGte !== undefined) {
                                localVarQueryParameter['id__gte'] = idGte;
                            }
                            if (idGt !== undefined) {
                                localVarQueryParameter['id__gt'] = idGt;
                            }
                            if (nameN !== undefined) {
                                localVarQueryParameter['name__n'] = nameN;
                            }
                            if (nameIc !== undefined) {
                                localVarQueryParameter['name__ic'] = nameIc;
                            }
                            if (nameNic !== undefined) {
                                localVarQueryParameter['name__nic'] = nameNic;
                            }
                            if (nameIew !== undefined) {
                                localVarQueryParameter['name__iew'] = nameIew;
                            }
                            if (nameNiew !== undefined) {
                                localVarQueryParameter['name__niew'] = nameNiew;
                            }
                            if (nameIsw !== undefined) {
                                localVarQueryParameter['name__isw'] = nameIsw;
                            }
                            if (nameNisw !== undefined) {
                                localVarQueryParameter['name__nisw'] = nameNisw;
                            }
                            if (nameIe !== undefined) {
                                localVarQueryParameter['name__ie'] = nameIe;
                            }
                            if (nameNie !== undefined) {
                                localVarQueryParameter['name__nie'] = nameNie;
                            }
                            if (slugN !== undefined) {
                                localVarQueryParameter['slug__n'] = slugN;
                            }
                            if (slugIc !== undefined) {
                                localVarQueryParameter['slug__ic'] = slugIc;
                            }
                            if (slugNic !== undefined) {
                                localVarQueryParameter['slug__nic'] = slugNic;
                            }
                            if (slugIew !== undefined) {
                                localVarQueryParameter['slug__iew'] = slugIew;
                            }
                            if (slugNiew !== undefined) {
                                localVarQueryParameter['slug__niew'] = slugNiew;
                            }
                            if (slugIsw !== undefined) {
                                localVarQueryParameter['slug__isw'] = slugIsw;
                            }
                            if (slugNisw !== undefined) {
                                localVarQueryParameter['slug__nisw'] = slugNisw;
                            }
                            if (slugIe !== undefined) {
                                localVarQueryParameter['slug__ie'] = slugIe;
                            }
                            if (slugNie !== undefined) {
                                localVarQueryParameter['slug__nie'] = slugNie;
                            }
                            if (limit !== undefined) {
                                localVarQueryParameter['limit'] = limit;
                            }
                            if (offset !== undefined) {
                                localVarQueryParameter['offset'] = offset;
                            }
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesPartialUpdate: function (id, data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'id' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretRolesPartialUpdate', 'id', id);
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretRolesPartialUpdate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secret-roles/{id}/"
                                .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'PATCH' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesRead: function (id, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'id' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretRolesRead', 'id', id);
                            localVarPath = "/plugins/netbox_secretstore/secret-roles/{id}/"
                                .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'GET' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesUpdate: function (id, data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'id' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretRolesUpdate', 'id', id);
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretRolesUpdate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secret-roles/{id}/"
                                .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'PUT' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsBulkDelete: function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            localVarPath = "/plugins/netbox_secretstore/secrets/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'DELETE' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsBulkPartialUpdate: function (data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretsBulkPartialUpdate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secrets/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'PATCH' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsBulkUpdate: function (data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretsBulkUpdate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secrets/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'PUT' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsCreate: function (data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretsCreate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secrets/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'POST' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsDelete: function (id, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'id' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretsDelete', 'id', id);
                            localVarPath = "/plugins/netbox_secretstore/secrets/{id}/"
                                .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'DELETE' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {string} [id]
         * @param {string} [name]
         * @param {string} [created]
         * @param {string} [createdGte]
         * @param {string} [createdLte]
         * @param {string} [lastUpdated]
         * @param {string} [lastUpdatedGte]
         * @param {string} [lastUpdatedLte]
         * @param {string} [q]
         * @param {string} [roleId]
         * @param {string} [role]
         * @param {string} [device]
         * @param {string} [deviceId]
         * @param {string} [virtualMachine]
         * @param {string} [virtualMachineId]
         * @param {string} [tag]
         * @param {string} [idN]
         * @param {string} [idLte]
         * @param {string} [idLt]
         * @param {string} [idGte]
         * @param {string} [idGt]
         * @param {string} [nameN]
         * @param {string} [nameIc]
         * @param {string} [nameNic]
         * @param {string} [nameIew]
         * @param {string} [nameNiew]
         * @param {string} [nameIsw]
         * @param {string} [nameNisw]
         * @param {string} [nameIe]
         * @param {string} [nameNie]
         * @param {string} [roleIdN]
         * @param {string} [roleN]
         * @param {string} [deviceN]
         * @param {string} [deviceIdN]
         * @param {string} [virtualMachineN]
         * @param {string} [virtualMachineIdN]
         * @param {string} [tagN]
         * @param {number} [limit] Number of results to return per page.
         * @param {number} [offset] The initial index from which to return the results.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsList: function (id, name, created, createdGte, createdLte, lastUpdated, lastUpdatedGte, lastUpdatedLte, q, roleId, role, device, deviceId, virtualMachine, virtualMachineId, tag, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, roleIdN, roleN, deviceN, deviceIdN, virtualMachineN, virtualMachineIdN, tagN, limit, offset, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            localVarPath = "/plugins/netbox_secretstore/secrets/";
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'GET' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            if (id !== undefined) {
                                localVarQueryParameter['id'] = id;
                            }
                            if (name !== undefined) {
                                localVarQueryParameter['name'] = name;
                            }
                            if (created !== undefined) {
                                localVarQueryParameter['created'] = created;
                            }
                            if (createdGte !== undefined) {
                                localVarQueryParameter['created__gte'] = createdGte;
                            }
                            if (createdLte !== undefined) {
                                localVarQueryParameter['created__lte'] = createdLte;
                            }
                            if (lastUpdated !== undefined) {
                                localVarQueryParameter['last_updated'] = lastUpdated;
                            }
                            if (lastUpdatedGte !== undefined) {
                                localVarQueryParameter['last_updated__gte'] = lastUpdatedGte;
                            }
                            if (lastUpdatedLte !== undefined) {
                                localVarQueryParameter['last_updated__lte'] = lastUpdatedLte;
                            }
                            if (q !== undefined) {
                                localVarQueryParameter['q'] = q;
                            }
                            if (roleId !== undefined) {
                                localVarQueryParameter['role_id'] = roleId;
                            }
                            if (role !== undefined) {
                                localVarQueryParameter['role'] = role;
                            }
                            if (device !== undefined) {
                                localVarQueryParameter['device'] = device;
                            }
                            if (deviceId !== undefined) {
                                localVarQueryParameter['device_id'] = deviceId;
                            }
                            if (virtualMachine !== undefined) {
                                localVarQueryParameter['virtual_machine'] = virtualMachine;
                            }
                            if (virtualMachineId !== undefined) {
                                localVarQueryParameter['virtual_machine_id'] = virtualMachineId;
                            }
                            if (tag !== undefined) {
                                localVarQueryParameter['tag'] = tag;
                            }
                            if (idN !== undefined) {
                                localVarQueryParameter['id__n'] = idN;
                            }
                            if (idLte !== undefined) {
                                localVarQueryParameter['id__lte'] = idLte;
                            }
                            if (idLt !== undefined) {
                                localVarQueryParameter['id__lt'] = idLt;
                            }
                            if (idGte !== undefined) {
                                localVarQueryParameter['id__gte'] = idGte;
                            }
                            if (idGt !== undefined) {
                                localVarQueryParameter['id__gt'] = idGt;
                            }
                            if (nameN !== undefined) {
                                localVarQueryParameter['name__n'] = nameN;
                            }
                            if (nameIc !== undefined) {
                                localVarQueryParameter['name__ic'] = nameIc;
                            }
                            if (nameNic !== undefined) {
                                localVarQueryParameter['name__nic'] = nameNic;
                            }
                            if (nameIew !== undefined) {
                                localVarQueryParameter['name__iew'] = nameIew;
                            }
                            if (nameNiew !== undefined) {
                                localVarQueryParameter['name__niew'] = nameNiew;
                            }
                            if (nameIsw !== undefined) {
                                localVarQueryParameter['name__isw'] = nameIsw;
                            }
                            if (nameNisw !== undefined) {
                                localVarQueryParameter['name__nisw'] = nameNisw;
                            }
                            if (nameIe !== undefined) {
                                localVarQueryParameter['name__ie'] = nameIe;
                            }
                            if (nameNie !== undefined) {
                                localVarQueryParameter['name__nie'] = nameNie;
                            }
                            if (roleIdN !== undefined) {
                                localVarQueryParameter['role_id__n'] = roleIdN;
                            }
                            if (roleN !== undefined) {
                                localVarQueryParameter['role__n'] = roleN;
                            }
                            if (deviceN !== undefined) {
                                localVarQueryParameter['device__n'] = deviceN;
                            }
                            if (deviceIdN !== undefined) {
                                localVarQueryParameter['device_id__n'] = deviceIdN;
                            }
                            if (virtualMachineN !== undefined) {
                                localVarQueryParameter['virtual_machine__n'] = virtualMachineN;
                            }
                            if (virtualMachineIdN !== undefined) {
                                localVarQueryParameter['virtual_machine_id__n'] = virtualMachineIdN;
                            }
                            if (tagN !== undefined) {
                                localVarQueryParameter['tag__n'] = tagN;
                            }
                            if (limit !== undefined) {
                                localVarQueryParameter['limit'] = limit;
                            }
                            if (offset !== undefined) {
                                localVarQueryParameter['offset'] = offset;
                            }
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsPartialUpdate: function (id, data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'id' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretsPartialUpdate', 'id', id);
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretsPartialUpdate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secrets/{id}/"
                                .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'PATCH' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsRead: function (id, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'id' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretsRead', 'id', id);
                            localVarPath = "/plugins/netbox_secretstore/secrets/{id}/"
                                .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'GET' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsUpdate: function (id, data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // verify required parameter 'id' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretsUpdate', 'id', id);
                            // verify required parameter 'data' is not null or undefined
                            (0, common_1.assertParamExists)('secretsSecretsUpdate', 'data', data);
                            localVarPath = "/plugins/netbox_secretstore/secrets/{id}/"
                                .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                            localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                            if (configuration) {
                                baseOptions = configuration.baseOptions;
                            }
                            localVarRequestOptions = __assign(__assign({ method: 'PUT' }, baseOptions), options);
                            localVarHeaderParameter = {};
                            localVarQueryParameter = {};
                            // authentication Bearer required
                            return [4 /*yield*/, (0, common_1.setApiKeyToObject)(localVarHeaderParameter, "Authorization", configuration)];
                        case 1:
                            // authentication Bearer required
                            _a.sent();
                            localVarHeaderParameter['Content-Type'] = 'application/json';
                            (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter, options.query);
                            headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                            localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                            localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(data, localVarRequestOptions, configuration);
                            return [2 /*return*/, {
                                    url: (0, common_1.toPathString)(localVarUrlObj),
                                    options: localVarRequestOptions
                                }];
                    }
                });
            });
        }
    };
};
exports.SecretsApiAxiosParamCreator = SecretsApiAxiosParamCreator;
/**
 * SecretsApi - functional programming interface
 * @export
 */
var SecretsApiFp = function (configuration) {
    var localVarAxiosParamCreator = (0, exports.SecretsApiAxiosParamCreator)(configuration);
    return {
        /**
         * {         \"public_key\": \"<public key>\",         \"private_key\": \"<private key>\"     }
         * @summary This endpoint can be used to generate a new RSA key pair. The keys are returned in PEM format.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsGenerateRsaKeyPairList: function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsGenerateRsaKeyPairList(options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         * Retrieve a temporary session key to use for encrypting and decrypting secrets via the API. The user\'s private RSA key is POSTed with the name `private_key`. An example:      curl -v -X POST -H \"Authorization: Token <token>\" -H \"Accept: application/json; indent=4\" \\     --data-urlencode \"private_key@<filename>\" https://netbox/api/plugins/netbox_secretstore/get-session-key/  This request will yield a base64-encoded session key to be included in an `X-Session-Key` header in future requests:      {         \"session_key\": \"+8t4SI6XikgVmB5+/urhozx9O5qCQANyOk1MNe6taRf=\"     }  This endpoint accepts one optional parameter: `preserve_key`. If True and a session key exists, the existing session key will be returned instead of a new one.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsGetSessionKeyCreate: function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsGetSessionKeyCreate(options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesBulkDelete: function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretRolesBulkDelete(options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesBulkPartialUpdate: function (data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretRolesBulkPartialUpdate(data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesBulkUpdate: function (data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretRolesBulkUpdate(data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesCreate: function (data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretRolesCreate(data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesDelete: function (id, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretRolesDelete(id, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {string} [id]
         * @param {string} [name]
         * @param {string} [slug]
         * @param {string} [q]
         * @param {string} [idN]
         * @param {string} [idLte]
         * @param {string} [idLt]
         * @param {string} [idGte]
         * @param {string} [idGt]
         * @param {string} [nameN]
         * @param {string} [nameIc]
         * @param {string} [nameNic]
         * @param {string} [nameIew]
         * @param {string} [nameNiew]
         * @param {string} [nameIsw]
         * @param {string} [nameNisw]
         * @param {string} [nameIe]
         * @param {string} [nameNie]
         * @param {string} [slugN]
         * @param {string} [slugIc]
         * @param {string} [slugNic]
         * @param {string} [slugIew]
         * @param {string} [slugNiew]
         * @param {string} [slugIsw]
         * @param {string} [slugNisw]
         * @param {string} [slugIe]
         * @param {string} [slugNie]
         * @param {number} [limit] Number of results to return per page.
         * @param {number} [offset] The initial index from which to return the results.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesList: function (id, name, slug, q, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, slugN, slugIc, slugNic, slugIew, slugNiew, slugIsw, slugNisw, slugIe, slugNie, limit, offset, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretRolesList(id, name, slug, q, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, slugN, slugIc, slugNic, slugIew, slugNiew, slugIsw, slugNisw, slugIe, slugNie, limit, offset, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesPartialUpdate: function (id, data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretRolesPartialUpdate(id, data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesRead: function (id, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretRolesRead(id, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesUpdate: function (id, data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretRolesUpdate(id, data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsBulkDelete: function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretsBulkDelete(options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsBulkPartialUpdate: function (data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretsBulkPartialUpdate(data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsBulkUpdate: function (data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretsBulkUpdate(data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsCreate: function (data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretsCreate(data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsDelete: function (id, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretsDelete(id, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {string} [id]
         * @param {string} [name]
         * @param {string} [created]
         * @param {string} [createdGte]
         * @param {string} [createdLte]
         * @param {string} [lastUpdated]
         * @param {string} [lastUpdatedGte]
         * @param {string} [lastUpdatedLte]
         * @param {string} [q]
         * @param {string} [roleId]
         * @param {string} [role]
         * @param {string} [device]
         * @param {string} [deviceId]
         * @param {string} [virtualMachine]
         * @param {string} [virtualMachineId]
         * @param {string} [tag]
         * @param {string} [idN]
         * @param {string} [idLte]
         * @param {string} [idLt]
         * @param {string} [idGte]
         * @param {string} [idGt]
         * @param {string} [nameN]
         * @param {string} [nameIc]
         * @param {string} [nameNic]
         * @param {string} [nameIew]
         * @param {string} [nameNiew]
         * @param {string} [nameIsw]
         * @param {string} [nameNisw]
         * @param {string} [nameIe]
         * @param {string} [nameNie]
         * @param {string} [roleIdN]
         * @param {string} [roleN]
         * @param {string} [deviceN]
         * @param {string} [deviceIdN]
         * @param {string} [virtualMachineN]
         * @param {string} [virtualMachineIdN]
         * @param {string} [tagN]
         * @param {number} [limit] Number of results to return per page.
         * @param {number} [offset] The initial index from which to return the results.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsList: function (id, name, created, createdGte, createdLte, lastUpdated, lastUpdatedGte, lastUpdatedLte, q, roleId, role, device, deviceId, virtualMachine, virtualMachineId, tag, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, roleIdN, roleN, deviceN, deviceIdN, virtualMachineN, virtualMachineIdN, tagN, limit, offset, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretsList(id, name, created, createdGte, createdLte, lastUpdated, lastUpdatedGte, lastUpdatedLte, q, roleId, role, device, deviceId, virtualMachine, virtualMachineId, tag, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, roleIdN, roleN, deviceN, deviceIdN, virtualMachineN, virtualMachineIdN, tagN, limit, offset, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsPartialUpdate: function (id, data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretsPartialUpdate(id, data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsRead: function (id, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretsRead(id, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsUpdate: function (id, data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.secretsSecretsUpdate(id, data, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1["default"], base_1.BASE_PATH, configuration)];
                    }
                });
            });
        }
    };
};
exports.SecretsApiFp = SecretsApiFp;
/**
 * SecretsApi - factory interface
 * @export
 */
var SecretsApiFactory = function (configuration, basePath, axios) {
    var localVarFp = (0, exports.SecretsApiFp)(configuration);
    return {
        /**
         * {         \"public_key\": \"<public key>\",         \"private_key\": \"<private key>\"     }
         * @summary This endpoint can be used to generate a new RSA key pair. The keys are returned in PEM format.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsGenerateRsaKeyPairList: function (options) {
            return localVarFp.secretsGenerateRsaKeyPairList(options).then(function (request) { return request(axios, basePath); });
        },
        /**
         * Retrieve a temporary session key to use for encrypting and decrypting secrets via the API. The user\'s private RSA key is POSTed with the name `private_key`. An example:      curl -v -X POST -H \"Authorization: Token <token>\" -H \"Accept: application/json; indent=4\" \\     --data-urlencode \"private_key@<filename>\" https://netbox/api/plugins/netbox_secretstore/get-session-key/  This request will yield a base64-encoded session key to be included in an `X-Session-Key` header in future requests:      {         \"session_key\": \"+8t4SI6XikgVmB5+/urhozx9O5qCQANyOk1MNe6taRf=\"     }  This endpoint accepts one optional parameter: `preserve_key`. If True and a session key exists, the existing session key will be returned instead of a new one.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsGetSessionKeyCreate: function (options) {
            return localVarFp.secretsGetSessionKeyCreate(options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesBulkDelete: function (options) {
            return localVarFp.secretsSecretRolesBulkDelete(options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesBulkPartialUpdate: function (data, options) {
            return localVarFp.secretsSecretRolesBulkPartialUpdate(data, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesBulkUpdate: function (data, options) {
            return localVarFp.secretsSecretRolesBulkUpdate(data, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesCreate: function (data, options) {
            return localVarFp.secretsSecretRolesCreate(data, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesDelete: function (id, options) {
            return localVarFp.secretsSecretRolesDelete(id, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {string} [id]
         * @param {string} [name]
         * @param {string} [slug]
         * @param {string} [q]
         * @param {string} [idN]
         * @param {string} [idLte]
         * @param {string} [idLt]
         * @param {string} [idGte]
         * @param {string} [idGt]
         * @param {string} [nameN]
         * @param {string} [nameIc]
         * @param {string} [nameNic]
         * @param {string} [nameIew]
         * @param {string} [nameNiew]
         * @param {string} [nameIsw]
         * @param {string} [nameNisw]
         * @param {string} [nameIe]
         * @param {string} [nameNie]
         * @param {string} [slugN]
         * @param {string} [slugIc]
         * @param {string} [slugNic]
         * @param {string} [slugIew]
         * @param {string} [slugNiew]
         * @param {string} [slugIsw]
         * @param {string} [slugNisw]
         * @param {string} [slugIe]
         * @param {string} [slugNie]
         * @param {number} [limit] Number of results to return per page.
         * @param {number} [offset] The initial index from which to return the results.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesList: function (id, name, slug, q, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, slugN, slugIc, slugNic, slugIew, slugNiew, slugIsw, slugNisw, slugIe, slugNie, limit, offset, options) {
            return localVarFp.secretsSecretRolesList(id, name, slug, q, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, slugN, slugIc, slugNic, slugIew, slugNiew, slugIsw, slugNisw, slugIe, slugNie, limit, offset, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesPartialUpdate: function (id, data, options) {
            return localVarFp.secretsSecretRolesPartialUpdate(id, data, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesRead: function (id, options) {
            return localVarFp.secretsSecretRolesRead(id, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret role.
         * @param {SecretRole} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretRolesUpdate: function (id, data, options) {
            return localVarFp.secretsSecretRolesUpdate(id, data, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsBulkDelete: function (options) {
            return localVarFp.secretsSecretsBulkDelete(options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsBulkPartialUpdate: function (data, options) {
            return localVarFp.secretsSecretsBulkPartialUpdate(data, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsBulkUpdate: function (data, options) {
            return localVarFp.secretsSecretsBulkUpdate(data, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsCreate: function (data, options) {
            return localVarFp.secretsSecretsCreate(data, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsDelete: function (id, options) {
            return localVarFp.secretsSecretsDelete(id, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {string} [id]
         * @param {string} [name]
         * @param {string} [created]
         * @param {string} [createdGte]
         * @param {string} [createdLte]
         * @param {string} [lastUpdated]
         * @param {string} [lastUpdatedGte]
         * @param {string} [lastUpdatedLte]
         * @param {string} [q]
         * @param {string} [roleId]
         * @param {string} [role]
         * @param {string} [device]
         * @param {string} [deviceId]
         * @param {string} [virtualMachine]
         * @param {string} [virtualMachineId]
         * @param {string} [tag]
         * @param {string} [idN]
         * @param {string} [idLte]
         * @param {string} [idLt]
         * @param {string} [idGte]
         * @param {string} [idGt]
         * @param {string} [nameN]
         * @param {string} [nameIc]
         * @param {string} [nameNic]
         * @param {string} [nameIew]
         * @param {string} [nameNiew]
         * @param {string} [nameIsw]
         * @param {string} [nameNisw]
         * @param {string} [nameIe]
         * @param {string} [nameNie]
         * @param {string} [roleIdN]
         * @param {string} [roleN]
         * @param {string} [deviceN]
         * @param {string} [deviceIdN]
         * @param {string} [virtualMachineN]
         * @param {string} [virtualMachineIdN]
         * @param {string} [tagN]
         * @param {number} [limit] Number of results to return per page.
         * @param {number} [offset] The initial index from which to return the results.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsList: function (id, name, created, createdGte, createdLte, lastUpdated, lastUpdatedGte, lastUpdatedLte, q, roleId, role, device, deviceId, virtualMachine, virtualMachineId, tag, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, roleIdN, roleN, deviceN, deviceIdN, virtualMachineN, virtualMachineIdN, tagN, limit, offset, options) {
            return localVarFp.secretsSecretsList(id, name, created, createdGte, createdLte, lastUpdated, lastUpdatedGte, lastUpdatedLte, q, roleId, role, device, deviceId, virtualMachine, virtualMachineId, tag, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, roleIdN, roleN, deviceN, deviceIdN, virtualMachineN, virtualMachineIdN, tagN, limit, offset, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsPartialUpdate: function (id, data, options) {
            return localVarFp.secretsSecretsPartialUpdate(id, data, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsRead: function (id, options) {
            return localVarFp.secretsSecretsRead(id, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {number} id A unique integer value identifying this secret.
         * @param {WritableSecret} data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        secretsSecretsUpdate: function (id, data, options) {
            return localVarFp.secretsSecretsUpdate(id, data, options).then(function (request) { return request(axios, basePath); });
        }
    };
};
exports.SecretsApiFactory = SecretsApiFactory;
/**
 * SecretsApi - object-oriented interface
 * @export
 * @class SecretsApi
 * @extends {BaseAPI}
 */
var PluginsApi = /** @class */ (function (_super) {
    __extends(PluginsApi, _super);
    function PluginsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * {         \"public_key\": \"<public key>\",         \"private_key\": \"<private key>\"     }
     * @summary This endpoint can be used to generate a new RSA key pair. The keys are returned in PEM format.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsGenerateRsaKeyPairList = function (options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsGenerateRsaKeyPairList(options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     * Retrieve a temporary session key to use for encrypting and decrypting secrets via the API. The user\'s private RSA key is POSTed with the name `private_key`. An example:      curl -v -X POST -H \"Authorization: Token <token>\" -H \"Accept: application/json; indent=4\" \\     --data-urlencode \"private_key@<filename>\" https://netbox/api/plugins/netbox_secretstore/get-session-key/  This request will yield a base64-encoded session key to be included in an `X-Session-Key` header in future requests:      {         \"session_key\": \"+8t4SI6XikgVmB5+/urhozx9O5qCQANyOk1MNe6taRf=\"     }  This endpoint accepts one optional parameter: `preserve_key`. If True and a session key exists, the existing session key will be returned instead of a new one.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsGetSessionKeyCreate = function (options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsGetSessionKeyCreate(options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretRolesBulkDelete = function (options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretRolesBulkDelete(options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretRolesBulkPartialUpdateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretRolesBulkPartialUpdate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretRolesBulkPartialUpdate(requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretRolesBulkUpdateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretRolesBulkUpdate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretRolesBulkUpdate(requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretRolesCreateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretRolesCreate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretRolesCreate(requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretRolesDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretRolesDelete = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretRolesDelete(requestParameters.id, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretRolesListRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretRolesList = function (requestParameters, options) {
        var _this = this;
        if (requestParameters === void 0) { requestParameters = {}; }
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretRolesList(requestParameters.id, requestParameters.name, requestParameters.slug, requestParameters.q, requestParameters.idN, requestParameters.idLte, requestParameters.idLt, requestParameters.idGte, requestParameters.idGt, requestParameters.nameN, requestParameters.nameIc, requestParameters.nameNic, requestParameters.nameIew, requestParameters.nameNiew, requestParameters.nameIsw, requestParameters.nameNisw, requestParameters.nameIe, requestParameters.nameNie, requestParameters.slugN, requestParameters.slugIc, requestParameters.slugNic, requestParameters.slugIew, requestParameters.slugNiew, requestParameters.slugIsw, requestParameters.slugNisw, requestParameters.slugIe, requestParameters.slugNie, requestParameters.limit, requestParameters.offset, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretRolesPartialUpdateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretRolesPartialUpdate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretRolesPartialUpdate(requestParameters.id, requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretRolesReadRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretRolesRead = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretRolesRead(requestParameters.id, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretRolesUpdateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretRolesUpdate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretRolesUpdate(requestParameters.id, requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretsBulkDelete = function (options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretsBulkDelete(options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretsBulkPartialUpdateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretsBulkPartialUpdate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretsBulkPartialUpdate(requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretsBulkUpdateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretsBulkUpdate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretsBulkUpdate(requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretsCreateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretsCreate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretsCreate(requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretsDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretsDelete = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretsDelete(requestParameters.id, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretsListRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretsList = function (requestParameters, options) {
        var _this = this;
        if (requestParameters === void 0) { requestParameters = {}; }
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretsList(requestParameters.id, requestParameters.name, requestParameters.created, requestParameters.createdGte, requestParameters.createdLte, requestParameters.lastUpdated, requestParameters.lastUpdatedGte, requestParameters.lastUpdatedLte, requestParameters.q, requestParameters.roleId, requestParameters.role, requestParameters.device, requestParameters.deviceId, requestParameters.virtualMachine, requestParameters.virtualMachineId, requestParameters.tag, requestParameters.idN, requestParameters.idLte, requestParameters.idLt, requestParameters.idGte, requestParameters.idGt, requestParameters.nameN, requestParameters.nameIc, requestParameters.nameNic, requestParameters.nameIew, requestParameters.nameNiew, requestParameters.nameIsw, requestParameters.nameNisw, requestParameters.nameIe, requestParameters.nameNie, requestParameters.roleIdN, requestParameters.roleN, requestParameters.deviceN, requestParameters.deviceIdN, requestParameters.virtualMachineN, requestParameters.virtualMachineIdN, requestParameters.tagN, requestParameters.limit, requestParameters.offset, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretsPartialUpdateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretsPartialUpdate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretsPartialUpdate(requestParameters.id, requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretsReadRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretsRead = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretsRead(requestParameters.id, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {SecretsApiSecretsSecretsUpdateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecretsApi
     */
    PluginsApi.prototype.secretsSecretsUpdate = function (requestParameters, options) {
        var _this = this;
        return (0, exports.SecretsApiFp)(this.configuration).secretsSecretsUpdate(requestParameters.id, requestParameters.data, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    return PluginsApi;
}(base_1.BaseAPI));
exports.PluginsApi = PluginsApi;
