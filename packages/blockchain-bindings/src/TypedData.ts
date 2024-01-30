import { TypedDataField } from '@ethersproject/abstract-signer';

export type Eip712TypedDataDomain = {
  name: string;
  version: string;
  chainId?: number;
  verifyingContract?: string;
};

export type TypedDataTypes = Record<string, Array<TypedDataField>>;

export type TypedDataMessage = {
  [k: string]: unknown;
};

export type TypedData<
  TTypes extends TypedDataTypes = TypedDataTypes,
  TMessage extends TypedDataMessage = TypedDataMessage,
> = {
  domain: Eip712TypedDataDomain;
  message: TMessage;
  primaryType?: string;
  types: TTypes;
};
