export interface IStorageProvider {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<string> | Promise<void> | void | string;
  removeItem: (key: string) => Promise<string> | Promise<void> | void;
}

export interface IStorage<Data> {
  set(data: Data): Promise<void>;
  get(): Promise<Data | null>;
  reset(): Promise<void>;
}
