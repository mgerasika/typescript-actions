"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var action_base_1 = require("./action-base");
exports.action = function () {
    // tslint:disable-next-line:only-arrow-functions
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:action', true, descriptor.value);
        var baseClass = Object.getPrototypeOf(target);
        var originalMethod = descriptor.value;
        if (baseClass.constructor === action_base_1.ActionBase) {
            descriptor.value = function () {
                return function (dispatcher) {
                    var actionInstance = Reflect.construct(target.constructor, []);
                    actionInstance.init(propertyKey, dispatcher);
                    // @ts-ignore
                    return originalMethod.apply(actionInstance, arguments);
                };
            };
            return descriptor;
        }
        else {
            descriptor.value = function () {
                return function (dispatcher) {
                    // @ts-ignore
                    var res = originalMethod.apply(target, arguments)(dispatcher, propertyKey);
                    console.log('dispatch ' + propertyKey + JSON.stringify(target));
                    return res;
                };
            };
            return descriptor;
        }
    };
};
//# sourceMappingURL=action.js.map