import { omitTypename } from '@lens-protocol/api-bindings';
import { TypedData } from '@lens-protocol/blockchain-bindings';
import { ProtocolTransactionRequestModel } from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { assertFailure, Result } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';

export function assertUnsignedProtocolCallCorrectness<T extends ProtocolTransactionRequestModel>(
  unsignedProtocolCall: UnsignedProtocolCall<T>,
  broadcastResult: {
    id: string;
    typedData: TypedData;
  },
) {
  expect(unsignedProtocolCall.id).toEqual(broadcastResult.id);
  expect(unsignedProtocolCall.typedData).toEqual(omitTypename(broadcastResult.typedData));
}

export function assertBroadcastingErrorResultWithRequestFallback(
  result: Result<unknown, BroadcastingError>,
  typedData: TypedData,
) {
  assertFailure(result);
  expect(result.error).toBeInstanceOf(BroadcastingError);
  expect(result.error.fallback).toMatchObject({
    contractAddress: typedData.domain.verifyingContract,
    encodedData: expect.any(String),
  });
}
