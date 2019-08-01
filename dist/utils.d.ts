export declare const __decorate: (decorators: any, target: any, key: any, desc: any) => any;
export declare const nameof: <T>(name: keyof T) => keyof T;
export declare const assert: (exp: boolean, msg: string) => void;
export declare const createUniqueActionName: (storeName: string, actionName: string) => string;
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
