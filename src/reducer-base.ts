import {assert, createUniqueActionName, getStoreNameFromUniqueActionName} from './utils';
import {IAction} from './action';

export function reducerBase() {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // @ts-ignore
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        // @ts-ignore
        Reflect.defineMetadata('design:decorator:reducer', true, descriptor.value);
        return descriptor;
    };
}

export abstract class ReducerBase<T> {
    public store: T = {} as T;

    public abstract getStoreName(): string;

    public request(): T {
        return {
            ...this.store,
            loading: true,
        };
    }

    public success(payload: any) {
        return {
            ...this.store,
            loading: false,
        };
    }

    public failed(error: string) {
        return {
            ...this.store,
            loading: false,
            error
        };
    }

    @reducerBase()
    public resetStore(): T {
        return {
            ...this.store,
        };
    }

    public getReducers() {
        const proto = (this as any)[`__proto__`];
        const keys = Object.getOwnPropertyNames(proto);
        const newKeys = keys.filter(key => {
            // @ts-ignore
            const hasDecorator = Reflect.getMetadata('design:decorator:reducer', this[key]);
            return hasDecorator;
        });

        const result = newKeys.reduce((accum: {}, methodName) => {
            const reducersFn = createReducersFunctions(this.getStoreName(), methodName, proto);
            return {...accum, ...reducersFn};
        }, {});
        return result;
    }
}

export const createReducersFunctions = (storeName: string, methodName: string, proto: any): {} => {
    const reducerFns: any = {};
    reducerFns[createUniqueActionName(storeName, methodName)] = (store: any, payload: any) => {
        const reducerInst = Reflect.construct(proto.constructor, []) as any;
        reducerInst.store = store;
        return reducerInst[methodName](null, payload);
    };

    reducerFns[createUniqueActionName(storeName, `${methodName}:request`)] = (store: any, payload: any) => {
        const reducerInst = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.store = store;
        return reducerInst.request();
    };

    reducerFns[createUniqueActionName(storeName, `${methodName}:success`)] = (store: any, payload: any) => {
        const reducerInst: any = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.store = store;
        const newStore = reducerInst.success(payload);

        reducerInst.store = newStore;
        return reducerInst[methodName](null, payload);
    };

    reducerFns[createUniqueActionName(storeName, `${methodName}:failed`)] = (store: any, payload: any) => {
        const reducerBase = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerBase.store = store;
        return reducerBase.failed(payload);
    };

    return reducerFns;
};

