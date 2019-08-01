import {createUniqueActionName} from './utils';

export interface IAction {
    name: string;
    payload: any;
}

export declare type PromiseMix<First, Seccond> = Promise<First> | Seccond;

export abstract class ActionBase {
    private _executingActionName: string = '';
    private _reduxDispatcher: IDispatch = () => {
    };

    public init(actionName: string, reduxDispatcher: IDispatch) {
        this._executingActionName = actionName;
        this._reduxDispatcher = reduxDispatcher;
    }

    public dispatchFailed(error: any) {
        this._reduxDispatcher({
            name: createUniqueActionName(this.getStoreName(), this._executingActionName + ':failed'),
            payload: error,
        });
    }

    public abstract getStoreName(): string;

    public dispatchRequest() {
        this._reduxDispatcher({
            name: createUniqueActionName(this.getStoreName(), this._executingActionName + ':request'),
            payload: ''
        });
    }

    public dispatchSuccess(args: any) {
        this._reduxDispatcher({
            name: createUniqueActionName(this.getStoreName(), this._executingActionName + ':success'),
            payload: args
        });
    }

    protected dispatch(payload: any) {
        this._reduxDispatcher({
            name: createUniqueActionName(this.getStoreName(), this._executingActionName),
            payload
        });
    }
}

export declare type IDispatch = (dispatcher: any) => void;
