import type { TypedDataDomain, TypedDataField } from 'ethers';

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
