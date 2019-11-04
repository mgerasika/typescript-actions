"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var action_base_1 = require("./action-base");
exports.action = function () {
    // tslint:disable-next-line:only-arrow-functions
    return function (target, propertyKey, descriptor) {
        var baseClass = Object.getPrototypeOf(target);
        var originalMethod = descriptor.value;
        if (baseClass.constructor === action_base_1.ActionBase) {
            descriptor.value = function () {
                var arg = arguments;
                return function (dispatcher) {
                    var actionInstance = Reflect.construct(target.constructor, []);
                    actionInstance.init(propertyKey, dispatcher);
                    // @ts-ignore
                    return originalMethod.apply(actionInstance, arg);
                };
            };
        }
        else {
            descriptor.value = function () {
                var arg = arguments;
                return function (dispatcher) {
                    // @ts-ignore
                    return originalMethod.apply(target, arg)(dispatcher, propertyKey);
                };
            };
        }
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:action', true, descriptor.value);
        return descriptor;
    };
};
exports.apiAction = function () {
    // tslint:disable-next-line:only-arrow-functions
    return function (target, propertyKey, descriptor) {
        var baseClass = Object.getPrototypeOf(target);
        var originalMethod = descriptor.value;
        if (baseClass.constructor === action_base_1.ActionBase) {
            descriptor.value = function () {
                var arg = arguments;
                return function (dispatcher) {
                    var actionInstance = Reflect.construct(target.constructor, []);
                    actionInstance.init(propertyKey, dispatcher);
                    actionInstance.request()(dispatcher);
                    // @ts-ignore)
                    return originalMethod.apply(actionInstance, arg)
                        .then(function (response) {
                        actionInstance.success(response)(dispatcher);
                        return Promise.resolve('');
                    })
                        .catch(function (error) {
                        actionInstance.failed(error)(dispatcher);
                        return Promise.reject(error);
                    });
                };
            };
        }
        else {
            console.error('This decorator allowed only when extends ActionBase class.');
        }
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:action', true, descriptor.value);
        return descriptor;
    };
};
//# sourceMappingURL=action.js.map