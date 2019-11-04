// tslint:disable-next-line
import {ReducerBase} from './reducer-base';
import {IStoreBase} from './store';
import {IAction} from './action-base';

export declare type PromiseOrVoid<T> = Promise<T> | void;

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

export const nameof = <T>(name: keyof T): string => name as string;

export const assert = (exp: boolean, msg: string) => {
    if (!exp) {
        alert(msg);
    }
};

const UNIQUE_STORE_SEPARATOR = '-';
const createUniqueActionName = (storeName: string, actionName: string): string => {
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

/**
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
export const createReducer = (inst: ReducerBase<any>) => {
    const methodNames = getReducerMethodNames(inst);
    const result: any = methodNames.reduce((accum: {}, methodName) => {
        const reducersFn = createReducersFunctions(inst.getStoreName(), methodName, inst);
        return {...accum, ...reducersFn};
    }, {});

    return (state: any, payload: IAction) => {
        if(!state) {
            //todo initial
            return {};
        }
        const fn = result[payload.type];
        return fn ? fn(state, payload) : state;
    };
};

export const createReducers = (arr: Array<ReducerBase<IStoreBase>>) => {
    return arr.reduce((accum: any, reducer: ReducerBase<IStoreBase>) => {
        accum[reducer.getStoreName()] = createReducer(reducer);
        return accum;
    }, {});
};

const getReducerMethodNames = (inst: ReducerBase<any>): string[] => {
    const proto = (inst as any)[`__proto__`];
    const allPropertyNames = Object.getOwnPropertyNames(proto);
    const methodNames = allPropertyNames.filter(key => {
        // @ts-ignore
        const hasDecorator = proto[key] && Reflect.getMetadata('design:decorator:reducer', proto[key]);
        return hasDecorator;
    });
    return methodNames;
};

export const actionNames = {
    getActionName: (storeName: string, methodName: string) => {
        return createUniqueActionName(storeName, methodName);
    },

    getRequestActionName: (storeName: string, methodName: string) => {
        return createUniqueActionName(storeName, `${methodName}:request`);
    },

    getSuccessActionName: (storeName: string, methodName: string) => {
        return createUniqueActionName(storeName, `${methodName}:success`);
    },

    getFailedActionName: (storeName: string, methodName: string) => {
        return createUniqueActionName(storeName, `${methodName}:failed`);
    },

    getResetStoreActionName: (storeName: string, methodName: string) => {
        return createUniqueActionName(storeName, `${methodName}:reset-store`);
    },
};

const createReducersFunctions = (storeName: string, methodName: string, inst: ReducerBase<any>): {} => {
    const result: any = {};
    const proto = (inst as any)[`__proto__`];
    result[actionNames.getActionName(storeName, methodName)] = (store: IStoreBase, payload: any) => {
        const reducerInst: ReducerBase<IStoreBase> = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.init(store);
        return (reducerInst as any)[methodName](store, payload);
    };

    result[actionNames.getRequestActionName(storeName, methodName)] = (store: IStoreBase, payload: any) => {
        const reducerInst: ReducerBase<IStoreBase> = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.init(store);
        reducerInst.request();
        return reducerInst.store;
    };

    result[actionNames.getSuccessActionName(storeName, methodName)] = (store: IStoreBase, payload: any) => {
        const reducerInst: ReducerBase<IStoreBase> = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.init(store);
        reducerInst.success(payload);
        return (reducerInst as any)[methodName](store, payload);
    };

    result[actionNames.getFailedActionName(storeName, methodName)] = (store: IStoreBase, payload: any) => {
        const reducerInst: ReducerBase<IStoreBase> = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.init(store);
        reducerInst.failed(payload);
        return reducerInst.store;
    };

    result[actionNames.getResetStoreActionName(storeName, '')] = (store: IStoreBase, payload: any) => {
        const reducerInst: ReducerBase<IStoreBase> = Reflect.construct(proto.constructor, []) as ReducerBase<any>;
        reducerInst.init(store);
        reducerInst.resetStore();
        return reducerInst.store;
    };

    return result;
};
