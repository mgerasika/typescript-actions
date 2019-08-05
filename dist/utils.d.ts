import { ReducerBase } from './reducer-base';
import { IAction } from './action-base';
export declare type PromiseOrVoid<T> = Promise<T> | void;
export declare const __decorate: (decorators: any, target: any, key: any, desc: any) => any;
export declare const nameof: <T>(name: keyof T) => string;
export declare const assert: (exp: boolean, msg: string) => void;
export declare const getStoreNameFromUniqueActionName: (uniqueActionName: string) => string;
export interface Ctor<T> {
    new (...args: any[]): T;
}
export declare type ActionCtor<T, B, C> = {
    readonly action: B & {
        readonly type: T;
    };
    readonly type: T;
    new (...args: any[]): {
        readonly type: T;
    };
} & C;
export declare function union<C extends {
    [key: string]: ActionCtor<string, {}, Ctor<{}>>;
}>(ctors: C): C[keyof C]['action'];
export declare const createReducer: (inst: ReducerBase<any>) => (store: any, payload: IAction) => any;
export declare const actionNames: {
    getActionName: (storeName: string, methodName: string) => string;
    getRequestActionName: (storeName: string, methodName: string) => string;
    getSuccessActionName: (storeName: string, methodName: string) => string;
    getFailedActionName: (storeName: string, methodName: string) => string;
    getResetStoreActionName: (storeName: string, methodName: string) => string;
};
