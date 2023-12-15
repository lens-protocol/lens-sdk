import type { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';

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

/**
 * @internal
 */
export type Typename<T> = { [key in '__typename']: T };

/**
 * @internal
 */
export type PickByTypename<T extends Typename<string>, P extends T['__typename']> = T extends {
  __typename?: P;
}
  ? T
  : never;
