"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = function () {
    // tslint:disable-next-line:only-arrow-functions
    return function (target, propertyKey, descriptor) {
        // @ts-ignore
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        // @ts-ignore
        Reflect.defineMetadata('design:decorator:action', true, descriptor.value);
        var baseClass = Object.getPrototypeOf(target);
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            return function (dispatcher) {
                // @ts-ignore
                var res = originalMethod.apply(target, arguments)(dispatcher, propertyKey);
                console.log('dispatch ' + propertyKey + JSON.stringify(target));
                return res;
            };
        };
        return descriptor;
    };
};
//# sourceMappingURL=action.js.map