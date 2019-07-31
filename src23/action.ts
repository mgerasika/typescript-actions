// decorator
import {assert} from './utils';

export const action = () => {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // @ts-ignore
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        // @ts-ignore
        Reflect.defineMetadata('design:decorator:action', true, descriptor.value);

        const baseClass = Object.getPrototypeOf(target);
        const originalMethod = descriptor.value;
        descriptor.value = function() {
            return (dispatcher: any) => {
                // @ts-ignore
                const res = originalMethod.apply(target, arguments)(dispatcher, propertyKey);
                console.log('dispatch ' + propertyKey + JSON.stringify(target));
                return res;
            };
        };
        return descriptor;
    };
}

export interface IAction {
    name: string;
    payload: any;
}
