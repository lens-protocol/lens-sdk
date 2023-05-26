import { TypedDataField } from 'ethers';

export type Eip712TypedDataDomain = {
  name: string;
  chainId: number;
  version: string;
  verifyingContract: string;
};

export type TypedData = {
  domain: Eip712TypedDataDomain;
  types: Record<string, Array<TypedDataField>>;
  primaryType?: string;
  message: {
    nonce: number;
    [k: string]: unknown;
  };
};
