import { Prettify } from '@lens-protocol/shared-kernel';

type InferResultTypeRaw<T> = T extends {
  result: infer C;
}
  ? C
  : never;

export type InferResultType<T> = Prettify<InferResultTypeRaw<T>>;
