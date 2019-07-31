interface ISum {
    number1: number;
    number2: number;
}
interface IStore {
    result: number;
}
export interface ISumRedux {
    sum(payload: ISum): any;
    sumApi(payload: ISum, payloadFromService?: number): any;
}
export declare class SumAction implements ISumRedux {
    sum(payload: ISum): (dispath: any, methodName: string) => void;
    sumApi(payload: ISum): (dispath: any, methodName: string) => void;
}
export declare class SumReducer implements ISumRedux {
    sum(payload: ISum): (store: IStore) => IStore;
    sumApi(payload: ISum): (store: IStore) => IStore;
}
export {};
