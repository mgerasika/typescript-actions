"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var reducer_base_1 = require("./reducer-base");
function reducer() {
    // tslint:disable-next-line:only-arrow-functions
    return function (target, propertyKey, descriptor) {
        var baseClass = Object.getPrototypeOf(target);
        var originalMethod = descriptor.value;
        if (baseClass.constructor === reducer_base_1.ReducerBase) {
            descriptor.value = function (store, action) {
                var reducerInstance = Reflect.construct(target.constructor, []);
                reducerInstance.init(store);
                // @ts-ignore
                originalMethod.call(reducerInstance, null, action.payload);
                return reducerInstance.store;
            };
        }
        else {
            descriptor.value = function (store, action) {
                // @ts-ignore
                var res = originalMethod.apply(target, arguments)(store, action.payload);
                console.log('redux ' + propertyKey + JSON.stringify(target));
                return res;
            };
        }
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:reducer', true, descriptor.value);
        return descriptor;
    };
}
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map