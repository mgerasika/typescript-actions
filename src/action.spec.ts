import {action} from './action';
import {IAction} from './action-base';

test('adds 1 + 2 to equal 3', () => {
    class demo {
        public x() {
            return (dispatch: any, actionName: string) => {
                dispatch({
                    name: actionName,
                    payload: 'hi'
                });
            };
        }
    }

    const instance = new demo();
    const refToFn = action()(instance, 'x', {
        value: () => {
            return instance.x();
        }
    }).value();
    refToFn((arg: IAction) => {
        expect(arg.name).toBe('x');
    });
});

