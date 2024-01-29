import { ErrorCode } from '@ethersproject/logger';
import { errorCodes } from 'eth-rpc-errors';

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

export function isUserRejectedError(err: ErrorShape<unknown>) {
  return (
    err.code === ErrorCode.ACTION_REJECTED || err.code === errorCodes.provider.userRejectedRequest
  );
}
