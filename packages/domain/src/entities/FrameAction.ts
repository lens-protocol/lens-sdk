export type UnsignedFrameAction<TData> = {
  data: TData;
};

export type SignedFrameAction<TData> = {
  signature: string;
  signedTypedData: TData;
};
