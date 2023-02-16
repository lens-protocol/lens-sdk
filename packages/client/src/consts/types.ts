import { Prettify } from '@lens-protocol/shared-kernel';

type TypedDataResultRaw<T> = T extends {
  result: infer C;
}
  ? C
  : never;

export type TypedDataResult<T> = Prettify<TypedDataResultRaw<T>>;
