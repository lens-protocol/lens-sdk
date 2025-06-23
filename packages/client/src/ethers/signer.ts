import type {
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
} from '@lens-protocol/graphql';
import type { TxHash } from '@lens-protocol/types';
import {
  errAsync,
  nonNullable,
  okAsync,
  ResultAsync,
  txHash,
} from '@lens-protocol/types';
import type { Signer } from 'ethers';
import { types } from 'zksync-ethers';
import type { SignMessage } from '../clients';
import { SigningError, ValidationError } from '../errors';
import {
  isTransactionRequest,
  type OperationHandler,
  type OperationResult,
} from '../types';

function nullableToOptional<T extends object>(
  input: T,
): Partial<{ [K in keyof T]: Exclude<T[K], null> }> {
  // biome-ignore lint/suspicious/noExplicitAny: simplicity
  const result: any = {};

  for (const key in input) {
    if (Object.hasOwn(input, key)) {
      const value = input[key];
      if (value !== null) {
        result[key] = value;
      }
    }
  }

  return result;
}

function signWith(
  signer: Signer,
  request: SponsoredTransactionRequest | SelfFundedTransactionRequest,
): ResultAsync<TxHash, SigningError> {
  if (request.__typename === 'SponsoredTransactionRequest') {
    const { __typename, from: _, customData, ...transactionLike } = request.raw;
    const tx: types.TransactionLike = types.Transaction.from({
      ...transactionLike,
      customData: customData ? { ...nullableToOptional(customData) } : null,
    });

    return ResultAsync.fromPromise(
      signer
        .sendTransaction(tx)
        .then((response) => response.wait())
        .then((receipt) => txHash(nonNullable(receipt).hash)),
      (err) => SigningError.from(err),
    );
  }
  const { __typename, from: _, ...transactionLike } = request.raw;
  return ResultAsync.fromPromise(
    signer
      .sendTransaction(transactionLike)
      .then((response) => response.wait())
      .then((receipt) => txHash(nonNullable(receipt).hash)),
    (err) => SigningError.from(err),
  );
}

/**
 * Handles a transaction mutation result.
 *
 * In case the result is a transaction request, it will be signed and sent using the provided signer.
 */
export function handleOperationWith(signer: Signer): OperationHandler {
  return <T extends string, E extends string>(
    result: OperationResult<T, E>,
  ): ResultAsync<TxHash, SigningError | ValidationError<E>> => {
    if ('hash' in result) {
      return okAsync(result.hash);
    }

    if (isTransactionRequest(result)) {
      return signWith(signer, result);
    }

    return errAsync(ValidationError.fromErrorResponse(result));
  };
}

/**
 * @deprecated Use {@link handleOperationWith} instead.
 */
export const handleWith = handleOperationWith;

/**
 * Sign an Ethereum message with the provided signer.
 */
export function signMessageWith(signer: Signer): SignMessage {
  return (message: string) => signer.signMessage(message);
}
