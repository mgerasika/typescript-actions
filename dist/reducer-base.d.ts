import { IStoreBase } from './store';
export declare function reducerBase(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare abstract class ReducerBase<T extends IStoreBase> {
    private _store;
    static _initStore: any;
    abstract getStoreName(): string;
    init(store: T): void;
    readonly store: T;
    setState(newStore: Partial<T>): void;
    request(): void;
    success(payload: any): void;
    failed(error: string): void;
    resetStore(): void;
}
