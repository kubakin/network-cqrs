"use strict";
exports.__esModule = true;
exports.AdminGuard = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("@app/authorization/jwt/jwt-auth.guard");
var roles_guard_1 = require("@app/authorization/roles/roles.guard");
var role_enum_1 = require("@app/authorization/roles/role.enum");
var roles_decorator_1 = require("@app/authorization/roles/roles.decorator");
function AdminGuard() {
    var a = (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard);
    var b = (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin);
    return function (target, propertyKey, descriptor) {
        if (process.env.DISABLE_GUARD === 'true') {
            return;
        }
        a(target, propertyKey, descriptor);
        b(target, propertyKey, descriptor);
    };
}
exports.AdminGuard = AdminGuard;
