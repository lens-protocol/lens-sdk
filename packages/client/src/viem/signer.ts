import type { chains } from '@lens-network/sdk/viem';
import type {
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
} from '@lens-protocol/graphql';
import {
  ResultAsync,
  type TxHash,
  errAsync,
  invariant,
  okAsync,
  txHash,
} from '@lens-protocol/types';
import type { Account, Hash, Transport, WalletClient } from 'viem';
import { sendTransaction as sendEip1559Transaction } from 'viem/actions';
import { sendEip712Transaction } from 'viem/zksync';
import { SigningError, ValidationError } from '../errors';
import {
  type DelegableOperationHandler,
  type OperationHandler,
  type OperationResult,
  type RestrictedOperationHandler,
  isTransactionRequest,
} from '../types';

async function sendTransaction(
  walletClient: WalletClient<Transport, chains.LensNetworkChain, Account>,
  request: SponsoredTransactionRequest | SelfFundedTransactionRequest,
): Promise<Hash> {
  invariant(
    walletClient.account.address === request.raw.from,
    `Account mismatch: ${walletClient.account} !== ${request.raw.from}`,
  );

  if (request.__typename === 'SponsoredTransactionRequest') {
    return sendEip712Transaction(walletClient, {
      account: walletClient.account,
      data: request.raw.data,
      gas: BigInt(request.raw.gasLimit),

      // TODO Replace this workaround hack once the gas price estimation is clarified.
      maxFeePerGas: BigInt(request.raw.gasPrice),
      maxPriorityFeePerGas: BigInt(request.raw.gasPrice),
      // gasPrice: BigInt(request.raw.gasPrice),
      nonce: request.raw.nonce,
      paymaster: request.raw.customData.paymasterParams?.paymaster,
      paymasterInput: request.raw.customData.paymasterParams?.paymasterInput,
      to: request.raw.to,
      value: BigInt(request.raw.value),
    });
  }

  return sendEip1559Transaction(walletClient, {
    account: walletClient.account,
    data: request.raw.data,
    gas: BigInt(request.raw.gasLimit),
    maxFeePerGas: BigInt(request.raw.maxFeePerGas),
    maxPriorityFeePerGas: BigInt(request.raw.maxPriorityFeePerGas),
    nonce: request.raw.nonce,
    to: request.raw.to,
    type: 'eip1559',
    value: BigInt(request.raw.value),
  });
}

function signWith(
  walletClient: WalletClient<Transport, chains.LensNetworkChain, Account>,
  request: SponsoredTransactionRequest | SelfFundedTransactionRequest,
): ResultAsync<TxHash, SigningError> {
  return ResultAsync.fromPromise(sendTransaction(walletClient, request).then(txHash), (err) =>
    SigningError.from(err),
  );
}

export function handleWith<T extends string, E extends string>(
  walletClient: WalletClient<Transport, chains.LensNetworkChain, Account>,
): DelegableOperationHandler<T, E>;
export function handleWith<E extends string>(
  walletClient: WalletClient<Transport, chains.LensNetworkChain, Account>,
): RestrictedOperationHandler<E>;
export function handleWith<T extends string, E extends string>(
  walletClient: WalletClient<Transport, chains.LensNetworkChain, Account>,
): OperationHandler<T, E> {
  return <T extends string, E extends string>(
    result: OperationResult<T, E>,
  ): ResultAsync<TxHash, SigningError | ValidationError<E>> => {
    if ('hash' in result) {
      return okAsync(result.hash);
    }

    if (isTransactionRequest(result)) {
      return signWith(walletClient, result);
    }

    return errAsync(ValidationError.fromErrorResponse(result));
  };
}
