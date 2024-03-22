import { UnknownObject } from '@lens-protocol/shared-kernel';

export type UnsignedFrameAction<TData extends UnknownObject> = {
  data: TData;
};

export type SignedFrameAction<TData extends UnknownObject> = {
  signature: string;
  signedTypedData: TData;
};
