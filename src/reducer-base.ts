import {IDispatch} from './action-base';
import {IStoreBase} from './store';

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

export abstract class ReducerBase<T extends IStoreBase> {
    private _store: T = {} as T;
    static _initStore: any;

    public abstract getStoreName(): string;

    public init(store: T) {
        this._store = store;

        if (!ReducerBase._initStore) {
            ReducerBase._initStore = store;
        }
    }

    public get store(): T {
        return this._store;
    }

    public setState(newStore: Partial<T>) {
        this._store = {
            ...this.store,
            ...newStore
        };
    }

    public request(): void {
        this.setState({loading: true} as T);
    }

    public success(payload: any): void {
        this.setState({loading: false} as T);
    }

    public failed(error: string): void {
        this.setState({loading: false, error: error} as T);
    }

    public resetStore(): void {
        this._store = {
            ...ReducerBase._initStore
        };
    }
}

