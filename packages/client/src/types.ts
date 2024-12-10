import type { PaginatedResultInfo } from '@lens-protocol/graphql';

import type {
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
} from '@lens-protocol/graphql';
import type { ResultAsync, TxHash } from '@lens-protocol/types';
import type { SigningError, ValidationError } from './errors';

export function isTransactionRequest(request: { __typename: string }): request is
  | SponsoredTransactionRequest
  | SelfFundedTransactionRequest {
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

export type DelegableOperationResult<
  O extends string,
  E extends string,
  OR extends OperationResponse<string> = OperationResponse<O>,
  ER extends ErrorResponse<string> = ErrorResponse<E>,
> = OR | SponsoredTransactionRequest | SelfFundedTransactionRequest | ER;

export type RestrictedOperationResult<
  E extends string,
  ER extends ErrorResponse<string> = ErrorResponse<E>,
> = SponsoredTransactionRequest | SelfFundedTransactionRequest | ER;

export type OperationResult<
  O extends string,
  E extends string,
  OR extends OperationResponse<string> = OperationResponse<O>,
  ER extends ErrorResponse<string> = ErrorResponse<E>,
> = DelegableOperationResult<O, E, OR, ER> | RestrictedOperationResult<E, ER>;

export type RestrictedOperationHandler<E extends string> = (
  result: RestrictedOperationResult<E>,
) => ResultAsync<TxHash, SigningError | ValidationError<E>>;

export type DelegableOperationHandler<T extends string, E extends string> = (
  result: DelegableOperationResult<T, E>,
) => ResultAsync<TxHash, SigningError | ValidationError<E>>;

export type OperationHandler<T extends string, E extends string> =
  | RestrictedOperationHandler<E>
  | DelegableOperationHandler<T, E>;

/**
 * A paginated list of items.
 */
export type Paginated<T> = {
  items: readonly T[];
  pageInfo: PaginatedResultInfo;
};
