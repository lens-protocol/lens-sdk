export type TypenameKey = '__typename';
export type Typename<T> = { [key in TypenameKey]: T };
export type JustTypename<T extends Typename<string>> = Pick<T, '__typename'>;
export type PickByTypename<T extends Typename<string>, P extends T['__typename']> = T extends {
  __typename?: P;
}
  ? T
  : never;
