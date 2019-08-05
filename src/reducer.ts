import 'reflect-metadata';
import {ActionBase, IAction} from './action-base';
import {ReducerBase} from './reducer-base';

export function reducer() {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const baseClass = Object.getPrototypeOf(target);
        const originalMethod = descriptor.value;
        if (baseClass.constructor === ReducerBase) {
            descriptor.value = function(store: any, action: IAction) {
                const reducerInstance: ReducerBase<any> = Reflect.construct(target.constructor, []);
                reducerInstance.init(store);
                // @ts-ignore
                originalMethod.call(reducerInstance, null, action.payload);
                return reducerInstance.store;
            };
        } else {
            descriptor.value = function(store: any, action: IAction) {
                // @ts-ignore
                const res = originalMethod.apply(target, arguments)(store, action.payload);
                console.log('redux ' + propertyKey + JSON.stringify(target));
                return res;
            };
        }
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:reducer', true, descriptor.value);
        return descriptor;
    };
}
