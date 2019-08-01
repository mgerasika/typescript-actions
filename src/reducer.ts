import 'reflect-metadata';
import {ActionBase} from './action-base';
import {ReducerBase} from './reducer-base';

export function reducer() {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:reducer', true, descriptor.value);
        const baseClass = Object.getPrototypeOf(target);
        const originalMethod = descriptor.value;
        if (baseClass.constructor === ReducerBase) {
            descriptor.value = function() {
                return (store: any, payload: any) => {
                    const reducerInstance = Reflect.construct(target.constructor, []);
                    reducerInstance.init(propertyKey, store);
                    // @ts-ignore
                    return originalMethod.apply(reducerInstance, payload);
                };
            };
            return descriptor;
        } else {
            descriptor.value = function() {
                return (store: any, payload: any) => {
                    // @ts-ignore
                    const res = originalMethod.apply(target, arguments)(store, payload);
                    console.log('redux ' + propertyKey + JSON.stringify(target));
                    return res;
                };
            };
            return descriptor;
        }
    };
}
