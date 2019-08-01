// tslint:disable-next-line
import {ReducerBase} from './reducer-base';
import {IStoreBase} from './store';
import {IAction} from './action-base';

export const __decorate = function(decorators: any, target: any, key: any, desc: any) {
    if (
        typeof Reflect === 'object' &&
        typeof (Reflect as any).decorate === 'function'
    ) {
        return (Reflect as any).decorate(decorators, target, key, desc);
    }
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight((o: any, d: any) => {
                return (d && d(o)) || o;
            }, target);
        case 3:
            return decorators.reduceRight((o: any, d: any) => {
                return d && d(target, key), void 0;
            }, void 0);
        case 4:
            return decorators.reduceRight((o: any, d: any) => {
                return (d && d(target, key, o)) || o;
            }, desc);
    }
};

export const nameof = <T>(name: keyof T) => name;

export const assert = (exp: boolean, msg: string) => {
    if (!exp) {
        alert(msg);
    }
};

const UNIQUE_STORE_SEPARATOR = '-';
export const createUniqueActionName = (storeName: string, actionName: string): string => {
    return `${storeName}${UNIQUE_STORE_SEPARATOR}${actionName}`;
};

export const getStoreNameFromUniqueActionName = (uniqueActionName: string): string => {
    const [storeName] = uniqueActionName.split(UNIQUE_STORE_SEPARATOR);
    return storeName;
};

export interface Ctor<T> {
    new(...args: any[]): T;
}

export declare type ActionCtor<T, B, C> = {
    readonly action: B & {
        readonly type: T;
    };
    readonly type: T;
    new(...args: any[]): {
        readonly type: T;
    };
} & C;

export declare function union<C extends {
    [key: string]: ActionCtor<string, {}, Ctor<{}>>;
}>(ctors: C): C[keyof C]['action'];

export const createReducer = (inst: ReducerBase<any>) => {
    const proto = (inst as any)[`__proto__`];
    const keys = Object.getOwnPropertyNames(proto);
    const newKeys = keys.filter(key => {
        // @ts-ignore
        const hasDecorator = proto[key] && Reflect.getMetadata('design:decorator:reducer', proto[key]);
        return hasDecorator;
    });

    const result: any = newKeys.reduce((accum: {}, methodName) => {
        const reducersFn = createReducersFunctions(inst.getStoreName(), methodName, proto);
        return {...accum, ...reducersFn};
    }, {});
    return (store: any, payload: IAction) => {
        return result[payload.name](store, payload);
    };
};

const createReducersFunctions = (storeName: string, methodName: string, proto: any): {} => {
    const reducerFns: any = {};
    reducerFns[createUniqueActionName(storeName, methodName)] = (store: IStoreBase, payload: any) => {
        const reducerInst: ReducerBase<IStoreBase> = Reflect.construct(proto.constructor, []) as any;
        reducerInst.init(methodName, store);
        return (reducerInst as any)[methodName](payload);
    };

    const requestMethodName = `${methodName}:request`;
    reducerFns[createUniqueActionName(storeName, requestMethodName)] = (store: IStoreBase, payload: any) => {
        const reducerInst: ReducerBase<IStoreBase> = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.init(requestMethodName, store);
        return reducerInst.request();
    };

    const successMethodName = `${methodName}:success`;
    reducerFns[createUniqueActionName(storeName, successMethodName)] = (store: IStoreBase, payload: any) => {
        const reducerInst: ReducerBase<IStoreBase> = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.init(successMethodName, store);
        reducerInst.success(payload);
        return (reducerInst as any)[methodName](payload);
    };

    const failedMethodName = `${methodName}:failed`;
    reducerFns[createUniqueActionName(storeName, failedMethodName)] = (store: IStoreBase, payload: any) => {
        const reducerInst: ReducerBase<IStoreBase> = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.init(failedMethodName, store);
        return reducerInst.failed(payload);
    };

    return reducerFns;
};
