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
exports.__decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === 'object' &&
        typeof Reflect.decorate === 'function') {
        return Reflect.decorate(decorators, target, key, desc);
    }
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return (d && d(o)) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key), void 0;
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key, o)) || o;
            }, desc);
    }
};
exports.nameof = function (name) { return name; };
exports.assert = function (exp, msg) {
    if (!exp) {
        alert(msg);
    }
};
var UNIQUE_STORE_SEPARATOR = '-';
var createUniqueActionName = function (storeName, actionName) {
    return "" + storeName + UNIQUE_STORE_SEPARATOR + actionName;
};
exports.getStoreNameFromUniqueActionName = function (uniqueActionName) {
    var storeName = uniqueActionName.split(UNIQUE_STORE_SEPARATOR)[0];
    return storeName;
};
exports.createReducer = function (inst) {
    var methodNames = getReducerMethodNames(inst);
    var result = methodNames.reduce(function (accum, methodName) {
        var reducersFn = createReducersFunctions(inst.getStoreName(), methodName, inst);
        return __assign({}, accum, reducersFn);
    }, {});
    return function (store, payload) {
        return result[payload.name](store, payload);
    };
};
var getReducerMethodNames = function (inst) {
    var proto = inst["__proto__"];
    var allPropertyNames = Object.getOwnPropertyNames(proto);
    var methodNames = allPropertyNames.filter(function (key) {
        // @ts-ignore
        var hasDecorator = proto[key] && Reflect.getMetadata('design:decorator:reducer', proto[key]);
        return hasDecorator;
    });
    return methodNames;
};
exports.actionNames = {
    getActionName: function (storeName, methodName) {
        return createUniqueActionName(storeName, methodName);
    },
    getRequestActionName: function (storeName, methodName) {
        return createUniqueActionName(storeName, methodName + ":request");
    },
    getSuccessActionName: function (storeName, methodName) {
        return createUniqueActionName(storeName, methodName + ":success");
    },
    getFailedActionName: function (storeName, methodName) {
        return createUniqueActionName(storeName, methodName + ":failed");
    },
    getResetStoreActionName: function (storeName, methodName) {
        return createUniqueActionName(storeName, methodName + ":reset-store");
    },
};
var createReducersFunctions = function (storeName, methodName, inst) {
    var result = {};
    var proto = inst["__proto__"];
    result[exports.actionNames.getActionName(storeName, methodName)] = function (store, payload) {
        return inst[methodName](store, payload);
    };
    result[exports.actionNames.getRequestActionName(storeName, methodName)] = function (store, payload) {
        var reducerInst = Reflect.construct(proto.constructor, []);
        reducerInst.init(store);
        reducerInst.request();
        return reducerInst.store;
    };
    result[exports.actionNames.getSuccessActionName(storeName, methodName)] = function (store, payload) {
        var reducerInst = Reflect.construct(proto.constructor, []);
        reducerInst.init(store);
        reducerInst.success(payload);
        return reducerInst[methodName](store, payload);
    };
    result[exports.actionNames.getFailedActionName(storeName, methodName)] = function (store, payload) {
        var reducerInst = Reflect.construct(proto.constructor, []);
        reducerInst.init(store);
        reducerInst.failed(payload);
        return reducerInst.store;
    };
    result[exports.actionNames.getResetStoreActionName(storeName, '')] = function (store, payload) {
        var reducerInst = Reflect.construct(proto.constructor, []);
        reducerInst.init(store);
        reducerInst.resetStore();
        return reducerInst.store;
    };
    return result;
};
//# sourceMappingURL=utils.js.map