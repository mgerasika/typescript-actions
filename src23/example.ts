import {action} from './action';
import {createReducer, reducer} from './reducer';

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

export class SumAction implements ISumRedux {
    @action()
    public sum(payload: ISum) {
        return (dispath: any, methodName: string) => {
            dispath({
                name: methodName, //methodName = 'sum'
                payload: payload
            });
        };
    };

    @action()
    public sumApi(payload: ISum) {
        return (dispath: any, methodName: string) => {
            Promise.resolve(payload.number1 + payload.number2).then((data) => {
                dispath({
                    name: methodName,
                    payload: data
                });
            });
        };
    };
}

export class SumReducer implements ISumRedux {
    @reducer()
    public sum(payload: ISum) {
        return (store: IStore): IStore => {
            return {
                ...store,
                result: payload.number1 + payload.number2
            };
        };
    };

    @reducer()
    public sumApi(payload: ISum) {
        return (store: IStore): IStore => {
            return {
                ...store,
                result: payload.number1 + payload.number2
            };
        };
    };
}

const sumAction = new SumAction();
const sumReducer = createReducer(new SumReducer());
