import {createUniqueActionName} from './utils';
import {action} from './action';

export interface IAction {
    name: string;
    payload: any;
}

export abstract class ActionBase {
    private executingActionName: string = '';
    private reduxDispatcher: IDispatch = () => {
    };

    public init(actionName: string, reduxDispatcher: IDispatch) {
        this.executingActionName = actionName;
        this.reduxDispatcher = reduxDispatcher;
    }

    public dispatchFailed(error: any) {
        this.reduxDispatcher({
            name: createUniqueActionName(this.getStoreName(), this.executingActionName + ':failed'),
            payload: error,
        });
    }

    public abstract getStoreName(): string;

    public dispatchRequest() {
        this.reduxDispatcher({
            name: createUniqueActionName(this.getStoreName(), this.executingActionName + ':request'),
            payload: ''
        });
    }

    public dispatchSuccess(args: any) {
        this.reduxDispatcher({
            name: createUniqueActionName(this.getStoreName(), this.executingActionName + ':success'),
            payload: args
        });
    }

    protected dispatch(payload: any) {
        this.reduxDispatcher({
            name: createUniqueActionName(this.getStoreName(), this.executingActionName),
            payload
        });
    }

    @action()
    public resetStore(): void {
        this.reduxDispatcher({
            name: createUniqueActionName(this.getStoreName(), this.executingActionName),
            payload: null,
        });
    }
}

export declare type IDispatch = (dispatcher: any) => void;
