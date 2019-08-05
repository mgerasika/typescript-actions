# typescript-actions
Typescript actions/reducers based on classes

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

export interface ICounterActions {
  increment(): void;

  decrement(): void;
}

export class CounterActions extends ActionBase implements ICounterActions {
  @action()
  public increment(): void {
    this.dispatch({
      name: this.actionName,
      payload: null
    });
  }

  @action()
  public decrement(): void {
    this.dispatch({
      name: this.actionName,
      payload: null
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
  public increment(): void {
    this.setState({
      result: this.store.result + 1
    });
  }

  @reducer()
  public decrement(): void {
    this.setState({
      result: this.store.result - 1
    });
  }
}
```
