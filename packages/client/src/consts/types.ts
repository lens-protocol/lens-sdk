import { Prettify } from '@lens-protocol/shared-kernel';
import type { TypedDataDomain, TypedDataField } from 'ethers';

type InferResultTypeRaw<T> = T extends {
  result: infer C;
}
  ? C
  : never;

export type InferResultType<T> = Prettify<InferResultTypeRaw<T>>;

export type TypedData = {
  domain: TypedDataDomain;
  types: Record<string, Array<TypedDataField>>;
  value: {
    nonce: number;
    [k: string]: unknown;
  };
};

export type TypedDataResponse = {
  id: string;
  typedData: TypedData;
  expiresAt: string;
};
