export interface IAction {
    name: string;
    payload: any;
}
export declare type PromiseMix<First, Seccond> = Promise<First> | Seccond;
export declare abstract class ActionBase {
    private _shortActionName;
    private _reduxDispatcher;
    init(actionName: string, reduxDispatcher: IDispatch): void;
    abstract getStoreName(): string;
    request(): (dispatcher: IDispatch) => void;
    success(args: any): (dispatcher: IDispatch) => void;
    failed(error: any): (dispatcher: IDispatch) => void;
    resetStore(): (dispatcher: IDispatch) => void;
    readonly actionName: string;
    protected dispatch(data: IAction | IDispatch): void;
}
export declare type IDispatch = (dispatcher: any) => void;
