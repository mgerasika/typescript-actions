"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var action_base_1 = require("./action-base");
function reducer() {
    // tslint:disable-next-line:only-arrow-functions
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:reducer', true, descriptor.value);
        var baseClass = Object.getPrototypeOf(target);
        var originalMethod = descriptor.value;
        if (baseClass.constructor === action_base_1.ActionBase) {
            return descriptor;
        }
        else {
            descriptor.value = function () {
                return function (store, payload) {
                    // @ts-ignore
                    var res = originalMethod.apply(target, arguments)(store, payload);
                    console.log('redux ' + propertyKey + JSON.stringify(target));
                    return res;
                };
            };
            return descriptor;
        }
    };
}
exports.reducer = reducer;
exports.createReducer = function (inst) {
    var proto = inst["__proto__"];
    var keys = Object.getOwnPropertyNames(proto);
    var newKeys = keys.filter(function (key) {
        // @ts-ignore
        var hasDecorator = _this[key] && Reflect.getMetadata('design:decorator:reducer', _this[key]);
        return hasDecorator;
    });
    var result = newKeys.reduce(function (accum, methodName) {
        var reducersFn = proto[methodName];
        return __assign({}, accum, reducersFn);
    }, {});
    return function (store, payload) {
        return result[payload.name](store, payload);
    };
};
//# sourceMappingURL=reducer.js.map