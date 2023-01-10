// eslint-disable-next-line no-restricted-imports
import { errorCodes } from 'eth-rpc-errors';

export type ProviderErrorCode = typeof errorCodes['provider'];
export type ProviderErrors = ProviderErrorCode[keyof ProviderErrorCode];

export const ProviderErrorCode: ProviderErrorCode = errorCodes.provider;

export type RpcErrorCode = typeof errorCodes['rpc'];
export type RpcErrors = RpcErrorCode[keyof RpcErrorCode];

export const RpcErrorCode: RpcErrorCode = errorCodes.rpc;

type ErrorShape<T> = {
  code: T;
  message: string;
  stack: string;
};

export function assertErrorObjectWithCode<T>(error: unknown): asserts error is ErrorShape<T> {
  if (!Object.prototype.hasOwnProperty.call(error, 'code')) {
    throw error;
  }
}
