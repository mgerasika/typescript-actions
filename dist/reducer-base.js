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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function reducerBase() {
    // tslint:disable-next-line:only-arrow-functions
    return function (target, propertyKey, descriptor) {
        // @ts-ignore
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        // @ts-ignore
        Reflect.defineMetadata('design:decorator:reducer', true, descriptor.value);
        return descriptor;
    };
}
exports.reducerBase = reducerBase;
var ReducerBase = /** @class */ (function () {
    function ReducerBase() {
        this.store = {};
    }
    ReducerBase.prototype.request = function () {
        return __assign({}, this.store, { loading: true });
    };
    ReducerBase.prototype.success = function (payload) {
        return __assign({}, this.store, { loading: false });
    };
    ReducerBase.prototype.failed = function (error) {
        return __assign({}, this.store, { loading: false, error: error });
    };
    ReducerBase.prototype.resetStore = function () {
        return __assign({}, this.store);
    };
    ReducerBase.prototype.getReducers = function () {
        var _this = this;
        var proto = this["__proto__"];
        var keys = Object.getOwnPropertyNames(proto);
        var newKeys = keys.filter(function (key) {
            // @ts-ignore
            var hasDecorator = Reflect.getMetadata('design:decorator:reducer', _this[key]);
            return hasDecorator;
        });
        var result = newKeys.reduce(function (accum, methodName) {
            var reducersFn = exports.createReducersFunctions(_this.getStoreName(), methodName, proto);
            return __assign({}, accum, reducersFn);
        }, {});
        return result;
    };
    __decorate([
        reducerBase(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], ReducerBase.prototype, "resetStore", null);
    return ReducerBase;
}());
exports.ReducerBase = ReducerBase;
exports.createReducersFunctions = function (storeName, methodName, proto) {
    var reducerFns = {};
    reducerFns[utils_1.createUniqueActionName(storeName, methodName)] = function (store, payload) {
        var reducerInst = Reflect.construct(proto.constructor, []);
        reducerInst.store = store;
        return reducerInst[methodName](null, payload);
    };
    reducerFns[utils_1.createUniqueActionName(storeName, methodName + ":request")] = function (store, payload) {
        var reducerInst = Reflect.construct(proto.constructor, []);
        reducerInst.store = store;
        return reducerInst.request();
    };
    reducerFns[utils_1.createUniqueActionName(storeName, methodName + ":success")] = function (store, payload) {
        var reducerInst = Reflect.construct(proto.constructor, []);
        reducerInst.store = store;
        var newStore = reducerInst.success(payload);
        reducerInst.store = newStore;
        return reducerInst[methodName](null, payload);
    };
    reducerFns[utils_1.createUniqueActionName(storeName, methodName + ":failed")] = function (store, payload) {
        var reducerBase = Reflect.construct(proto.constructor, []);
        reducerBase.store = store;
        return reducerBase.failed(payload);
    };
    return reducerFns;
};
//# sourceMappingURL=reducer-base.js.map