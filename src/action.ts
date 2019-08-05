import 'reflect-metadata';
import {ActionBase} from './action-base';

export const action = () => {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const baseClass = Object.getPrototypeOf(target);
        const originalMethod = descriptor.value;
        if (baseClass.constructor === ActionBase) {
            descriptor.value = function() {
                const arg = arguments;
                return (dispatcher: any) => {
                    const actionInstance: ActionBase = Reflect.construct(target.constructor, []) as ActionBase;
                    actionInstance.init(propertyKey, dispatcher);
                    // @ts-ignore
                    return originalMethod.apply(actionInstance, arg);
                };
            };
        } else {
            descriptor.value = function() {
                const arg = arguments;
                return (dispatcher: any) => {
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

export const apiAction = () => {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const baseClass = Object.getPrototypeOf(target);
        const originalMethod = descriptor.value;
        if (baseClass.constructor === ActionBase) {
            descriptor.value = function() {
                const arg = arguments;
                return (dispatcher: any) => {
                    const actionInstance: ActionBase = Reflect.construct(target.constructor, []) as ActionBase;
                    actionInstance.init(propertyKey, dispatcher);
                    actionInstance.request()(dispatcher);
                    // @ts-ignore)
                    return originalMethod.apply(actionInstance, arg)
                        .then((response: any) => {
                            actionInstance.success(response)(dispatcher);
                            return Promise.resolve('');
                        })
                        .catch((error: any) => {
                            actionInstance.failed(error)(dispatcher);
                            return Promise.reject(error);
                        });
                };
            };
        } else {
            console.error('This decorator allowed only when extends ActionBase class.');
        }

        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        Reflect.defineMetadata('design:decorator:action', true, descriptor.value);
        return descriptor;
    };
};
