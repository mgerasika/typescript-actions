# typescript-actions
Typescript actions/reducers based on classes and decorators

## Installation

```bash
// NPM
npm install --save typescript-actions

// YARN
yarn add typescript-actions
```

## Modify .tsconfig
```js
{
    "compilerOptions": {
        ...
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        ...
    }
}
```

## Add simple store
The main idea - you should strongly synchronize interfaces betwen action and reducers, with typescript interfaces.
This ideology uses a lot in .net projects and this is helpfull when you need support code.

```ts
import {action, ActionBase, apiAction, nameof, PromiseOrVoid} from 'typescript-actions/dist';

export interface ICounterStore extends IStoreBase {
  result: number;
}

export const initialCounterStore: ICounterStore = {
  ...baseInitialStore,
  result: 0,
};
```

## Action example
```ts
import {action, ActionBase, apiAction, nameof, PromiseOrVoid} from 'typescript-actions/dist';

interface ISumExample {
  x: number;
  y: number;
}

export interface ICounterActions {
  increment();
  decrement();
  sum(arg:IExampleArg);
}

export class CounterActions extends ActionBase implements ICounterActions {
  @action()
  public increment() {
    this.dispatch({
      name: this.actionName,
      payload: null
    });
  }

  @action()
  public decrement() {
    this.dispatch({
      name: this.actionName,
      payload: null
    });
  }
  
  @action()
  public sum(arg:ISumExample) {
    this.dispatch({
      name: this.actionName,
      payload: arg
    });
  }

  public getStoreName(): string {
    return nameof<IGlobalStore>('counter') as string;
  }
}
```

## Reducer example
```ts
import {ReducerBase} from 'typescript-actions/dist';

export class CounterReducer extends ReducerBase<ICounterStore> implements ICounterActions {
  public getStoreName() {
    return nameof<IGlobalStore>('counter');
  }

  @reducer()
  public increment() {
    this.setState({
      result: this.state.result + 1
    });
  }

  @reducer()
  public decrement() {
    this.setState({
      result: this.state.result - 1
    });
  }
  
   @reducer()
  public sum(arg:ISumExample) {
    this.setState({
      result: arg.x + arg.y
    });
  }
}
```

## Add finaly create reducer
```ts
import {createReducer} from 'typescript-actions/dist';

const reducerFn = createReducer(new CounterReducer());
```


## Example action with async action
```ts
  @action()
  public login(request: ILogin): Promise<string> {
    this.dispatch(this.request());
    return Promise.resolve('some data')
      .then((data) => {
        this.dispatch(this.success(data));
        return Promise.resolve('');
      })
      .catch((error) => {
        this.dispatch(this.failed(error));
        return Promise.reject(error);
      });
  }

```
## With apiAction decorator you should minimize you code to:
```ts

  @apiAction()
  public login(): Promise<string> {
    return Promise.resolve('some data');
  }
