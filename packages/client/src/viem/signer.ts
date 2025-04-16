import type { chains } from '@lens-chain/sdk/viem';
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
import type { Account, CustomSource, Hash, Transport, WalletClient } from 'viem';
import { sendTransaction as sendEip1559Transaction, waitForTransactionReceipt } from 'viem/actions';
import { sendEip712Transaction } from 'viem/zksync';

import type { SignMessage } from '../clients';
import { SigningError, ValidationError } from '../errors';
import { type OperationHandler, type OperationResult, isTransactionRequest } from '../types';
import { hasHoistedAccount, isOnLensChain } from './types';

async function sendTransaction(
  walletClient: WalletClient<Transport, chains.LensChain, Account>,
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
      maxFeePerGas: BigInt(request.raw.maxFeePerGas),
      maxPriorityFeePerGas: BigInt(request.raw.maxPriorityFeePerGas),
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

function sendTransactionWith(
  walletClient: WalletClient<Transport, chains.LensChain, Account>,
  request: SponsoredTransactionRequest | SelfFundedTransactionRequest,
): ResultAsync<TxHash, SigningError> {
  return ResultAsync.fromPromise(sendTransaction(walletClient, request), (err) =>
    SigningError.from(err),
  )
    .map(async (hash) => waitForTransactionReceipt(walletClient, { hash }))
    .map((receipt) => txHash(receipt.transactionHash));
}

/**
 * Handles a transaction mutation result.
 *
 * In case the result is a transaction request, it will be signed and sent using the provided wallet client.
 */
export function handleOperationWith(walletClient: WalletClient | undefined): OperationHandler {
  return <T extends string, E extends string>(
    result: OperationResult<T, E>,
  ): ResultAsync<TxHash, SigningError | ValidationError<E>> => {
    if ('hash' in result) {
      return okAsync(result.hash);
    }

    invariant(walletClient, 'Expected a WalletClient to handle the operation result.');

    invariant(
      isOnLensChain(walletClient),
      `Unsupported chain ${walletClient.chain?.id}. Expected a Lens chain.`,
    );
    invariant(hasHoistedAccount(walletClient), 'Expected a WalletClient with a hoisted account.');

    if (isTransactionRequest(result)) {
      return sendTransactionWith(walletClient, result);
    }

    return errAsync(ValidationError.fromErrorResponse(result));
  };
}

/**
 * @deprecated Use {@link handleOperationWith} instead.
 */
export const handleWith = handleOperationWith;

/**
 * Sign an Ethereum message with the provided wallet client.
 *
 * @param signer - A WalletClient or a custom source (e.g., a viem's LocalAccount)
 * @returns A function that signs a message.
 */
export function signMessageWith(signer: CustomSource | WalletClient): SignMessage {
  if ('request' in signer) {
    invariant(hasHoistedAccount(signer), 'Expected a WalletClient with a hoisted account.');
  }
  return (message: string) => signer.signMessage({ message });
}
