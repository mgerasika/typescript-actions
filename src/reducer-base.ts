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
    private _executingActionName: string = '';

    public abstract getStoreName(): string;

    public init(actionName: string, store: T) {
        this._executingActionName = actionName;
        this._store = store;
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

    public success(payload: any) {
        this.setState({loading: false} as T);
    }

    public failed(error: string) {
        this.setState({loading: false, error: error} as T);
    }
}

