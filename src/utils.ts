// tslint:disable-next-line
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
