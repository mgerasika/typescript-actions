import 'reflect-metadata';
import {ActionBase} from './action-base';

export function reducer() {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:reducer', true, descriptor.value);
        const baseClass = Object.getPrototypeOf(target);
        const originalMethod = descriptor.value;
        if (baseClass.constructor === ActionBase) {
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

export const createReducer = (inst: any) => {
    const proto = inst[`__proto__`];
    const keys = Object.getOwnPropertyNames(proto);
    const newKeys = keys.filter(key => {
        // @ts-ignore
        const hasDecorator = this[key] && Reflect.getMetadata('design:decorator:reducer', this[key]);
        return hasDecorator;
    });

    const result: any = newKeys.reduce((accum: {}, methodName) => {
        const reducersFn = proto[methodName];
        return {...accum, ...reducersFn};
    }, {});
    return (store: any, payload: any) => {
        return result[payload.name](store, payload);
    };
};
