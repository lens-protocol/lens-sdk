import { omitTypename } from '@lens-protocol/api-bindings';
import { TypedData } from '@lens-protocol/blockchain-bindings';
import { ProtocolTransactionRequestModel } from '@lens-protocol/domain/entities';
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
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

export function assertBroadcastingErrorWithReason(
  result: Result<unknown, BroadcastingError>,
  reason: BroadcastingErrorReason,
) {
  assertFailure(result);
  expect(result.error).toBeInstanceOf(BroadcastingError);
  expect(result.error.reason).toEqual(reason);
}
