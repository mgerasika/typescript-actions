export function reducer() {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // @ts-ignore
        Reflect.defineMetadata('design:name', propertyKey, descriptor.value);
        // @ts-ignore
        Reflect.defineMetadata('design:decorator:reducer', true, descriptor.value);
        const originalMethod = descriptor.value;
        descriptor.value = function() {
            return (store: any, payload: any) => {
                // @ts-ignore
                const res = originalMethod.apply(target, arguments)(store, payload);
                console.log('redux ' + propertyKey + JSON.stringify(target));
                return res;
            };
        };
        return descriptor;
    };
}

export const createReducer = (inst) => {
    const proto = inst[`__proto__`];
    const keys = Object.getOwnPropertyNames(proto);
    const newKeys = keys.filter(key => {
        // @ts-ignore
        const hasDecorator = Reflect.getMetadata('design:decorator:reducer', this[key]);
        return hasDecorator;
    });

    const result = newKeys.reduce((accum: {}, methodName) => {
        const reducersFn = proto[methodName];
        return {...accum, ...reducersFn};
    }, {});
    return (store, payload) => {
        return result[payload.name](store, payload);
    };
};
