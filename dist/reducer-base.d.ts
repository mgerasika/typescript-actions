export declare function reducerBase(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare abstract class ReducerBase<T> {
    store: T;
    abstract getStoreName(): string;
    request(): T;
    success(payload: any): T & {
        loading: boolean;
    };
    failed(error: string): T & {
        loading: boolean;
        error: string;
    };
    resetStore(): T;
    getReducers(): {};
}
export declare const createReducersFunctions: (storeName: string, methodName: string, proto: any) => {};
