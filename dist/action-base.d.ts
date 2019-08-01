export interface IAction {
    name: string;
    payload: any;
}
export declare abstract class ActionBase {
    private executingActionName;
    private reduxDispatcher;
    init(actionName: string, reduxDispatcher: IDispatch): void;
    dispatchFailed(error: any): void;
    abstract getStoreName(): string;
    dispatchRequest(): void;
    dispatchSuccess(args: any): void;
    protected dispatch(payload: any): void;
    resetStore(): void;
}
export declare type IDispatch = (dispatcher: any) => void;
