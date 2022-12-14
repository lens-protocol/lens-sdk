import { TypedDataDomain, TypedDataField } from 'ethers';

export type TypedData = {
  domain: TypedDataDomain;
  types: Record<string, Array<TypedDataField>>;
  value: {
    nonce: number;
    [k: string]: unknown;
  };
};
