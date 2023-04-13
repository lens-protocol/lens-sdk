import { Eip712TypedDataDomain, OmitTypename } from '@lens-protocol/api-bindings';
import { TypedDataField } from 'ethers';

export type TypedData = {
  domain: OmitTypename<Eip712TypedDataDomain>;
  types: Record<string, Array<TypedDataField>>;
  value: {
    nonce: number;
    [k: string]: unknown;
  };
};
