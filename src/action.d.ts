export declare const action: () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export interface IAction {
    name: string;
    payload: any;
}
