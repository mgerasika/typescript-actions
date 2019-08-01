"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line
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
exports.createUniqueActionName = function (storeName, actionName) {
    return "" + storeName + UNIQUE_STORE_SEPARATOR + actionName;
};
exports.getStoreNameFromUniqueActionName = function (uniqueActionName) {
    var storeName = uniqueActionName.split(UNIQUE_STORE_SEPARATOR)[0];
    return storeName;
};
//# sourceMappingURL=utils.js.map