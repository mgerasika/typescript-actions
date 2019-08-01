export interface IBaseStore {
  loading: boolean;
  error: string;
}

export const baseInitialStore: IBaseStore = {
  loading: false,
  error: ''
};
