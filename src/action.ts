import 'reflect-metadata';
import {ActionBase} from './action-base';

export const action = () => {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:action', true, descriptor.value);

        const baseClass = Object.getPrototypeOf(target);
        const originalMethod = descriptor.value;
        if (baseClass.constructor === ActionBase) {
            descriptor.value = function() {
                return (dispatcher: any) => {
                    const actionInstance = Reflect.construct(target.constructor, []);
                    actionInstance.init(propertyKey, dispatcher);
                    // @ts-ignore
                    return originalMethod.apply(actionInstance, arguments);
                };
            };
            return descriptor;
        } else {
            descriptor.value = function() {
                return (dispatcher: any) => {
                    // @ts-ignore
                    return originalMethod.apply(target, arguments)(dispatcher, propertyKey);
                };
            };
            return descriptor;
        }
    };
};
