import type {
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
} from '@lens-protocol/graphql';
import type { ResultAsync, TxHash } from '@lens-protocol/types';
import type { SigningError, ValidationError } from './errors';

export function isTransactionRequest(request: {
  __typename: string;
}): request is SponsoredTransactionRequest | SelfFundedTransactionRequest {
  return (
    request.__typename === 'SponsoredTransactionRequest' ||
    request.__typename === 'SelfFundedTransactionRequest'
  );
}

export type OperationResponse<T extends string> = {
  __typename: T;
  hash: TxHash;
};

export type ErrorResponse<T extends string> = {
  __typename: T;
  reason: string;
};

export type DelegableOperationResult<O extends string, E extends string> =
  | OperationResponse<O>
  | SponsoredTransactionRequest
  | SelfFundedTransactionRequest
  | ErrorResponse<E>;

export type RestrictedOperationResult<E extends string> =
  | SponsoredTransactionRequest
  | SelfFundedTransactionRequest
  | ErrorResponse<E>;

export type OperationResult<O extends string, E extends string> =
  | DelegableOperationResult<O, E>
  | RestrictedOperationResult<E>;

export type RestrictedOperationHandler<E extends string> = (
  result: RestrictedOperationResult<E>,
) => ResultAsync<TxHash, SigningError | ValidationError<E>>;

export type DelegableOperationHandler<T extends string, E extends string> = (
  result: DelegableOperationResult<T, E>,
) => ResultAsync<TxHash, SigningError | ValidationError<E>>;

export type OperationHandler<
  T extends string = string,
  E extends string = string,
> = T extends string
  ? DelegableOperationHandler<T, E>
  : RestrictedOperationHandler<E>;
