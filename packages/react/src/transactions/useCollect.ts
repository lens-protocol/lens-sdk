import {
  createCollectRequest,
  ProfileOwnedByMe,
  AnyPublication,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';

import { Operation, useOperation } from '../helpers/operations';
import { useCollectController } from './adapters/useCollectController';

export type UseCollectArgs = {
  collector: ProfileOwnedByMe;
  publication: AnyPublication;
};

export type CollectOperation = Operation<
  void,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
>;

/**
 * @category Publications
 * @group Hooks
 */
export function useCollect({ collector, publication }: UseCollectArgs): CollectOperation {
  const collect = useCollectController();
  return useOperation(async () => collect(createCollectRequest(publication, collector)));
}
