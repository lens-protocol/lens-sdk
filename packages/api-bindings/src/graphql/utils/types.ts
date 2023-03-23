export type Typename<T> = { [key in '__typename']: T };
export type JustTypename<T extends Typename<string>> = Pick<T, '__typename'>;
export type PickByTypename<T extends Typename<string>, P extends T['__typename']> = T extends {
  __typename?: P;
}
  ? T
  : never;
