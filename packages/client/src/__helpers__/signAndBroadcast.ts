import { IEquatableError, Result } from '@lens-protocol/shared-kernel';
import { Wallet } from 'ethers';

import type { TypedDataResponse } from '../consts/types';
import { isRelayerResult, Transaction } from '../transaction';

export async function signAndBroadcast<
  T extends TypedDataResponse,
  E extends IEquatableError<string, string>,
>(transaction: Transaction, wallet: Wallet, result: Result<T, E>) {
  const data = result.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value,
  );

  const broadcastResult = await transaction.broadcast({
    id: data.id,
    signature: signedTypedData,
  });

  const value = broadcastResult.unwrap();
  if (!isRelayerResult(value)) {
    throw new Error(`Transaction broadcast error: ${value.reason}`);
  }

  return value.txId;
}
