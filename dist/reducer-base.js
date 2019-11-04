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
Object.defineProperty(exports, "__esModule", { value: true });
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
        this._store = {};
    }
    ReducerBase.prototype.init = function (store) {
        this._store = store;
        if (!ReducerBase._initStore) {
            ReducerBase._initStore = store;
        }
    };
    Object.defineProperty(ReducerBase.prototype, "store", {
        get: function () {
            return this._store;
        },
        enumerable: true,
        configurable: true
    });
    ReducerBase.prototype.setState = function (newStore) {
        this._store = __assign({}, this.store, newStore);
    };
    ReducerBase.prototype.request = function () {
        this.setState({ loading: true });
    };
    ReducerBase.prototype.success = function (payload) {
        this.setState({ loading: false });
    };
    ReducerBase.prototype.failed = function (error) {
        this.setState({ loading: false, error: error });
    };
    ReducerBase.prototype.resetStore = function () {
        this._store = __assign({}, ReducerBase._initStore);
    };
    return ReducerBase;
}());
exports.ReducerBase = ReducerBase;
//# sourceMappingURL=reducer-base.js.map