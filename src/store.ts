export interface IStoreBase {
  loading: boolean;
  error: string;
}

export const baseInitialStore: IStoreBase = {
  loading: false,
  error: ''
};
