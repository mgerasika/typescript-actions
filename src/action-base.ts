import {actionNames} from './utils';

export interface IAction {
    name: string;
    payload: any;
}

export declare type PromiseMix<First, Seccond> = Promise<First> | Seccond;

export abstract class ActionBase {
    private _shortActionName: string = '';
    private _reduxDispatcher: IDispatch = () => {
    };

    public init(actionName: string, reduxDispatcher: IDispatch) {
        this._shortActionName = actionName;
        this._reduxDispatcher = reduxDispatcher;
    }


    public abstract getStoreName(): string;

    public request() {
        return (dispatcher: IDispatch) => {
            dispatcher({
                name: actionNames.getRequestActionName(this.getStoreName(), this._shortActionName),
                payload: null
            });
        };
    }

    public success(args: any) {
        return (dispatcher: IDispatch) => {
            dispatcher({
                name: actionNames.getSuccessActionName(this.getStoreName(), this._shortActionName),
                payload: args
            });
        };
    }

    public failed(error: any) {
        return (dispatcher: IDispatch) => {
            dispatcher({
                name: actionNames.getFailedActionName(this.getStoreName(), this._shortActionName),
                payload: error
            });
        };
    }

    public resetStore() {
        return (dispatcher: IDispatch) => {
            dispatcher({
                name: actionNames.getResetStoreActionName(this.getStoreName(), ''),
                payload: null
            });
        };
    }

    public get actionName(): string {
        return actionNames.getActionName(this.getStoreName(), this._shortActionName);
    }

    protected dispatch(data: IAction | IDispatch) {
        if (typeof data === 'function') {
            data(this._reduxDispatcher);
        } else {
            this._reduxDispatcher(data);
        }
    }
}

export declare type IDispatch = (dispatcher: any) => void;
