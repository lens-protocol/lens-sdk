import {
  createCollectRequest,
  ProfileOwnedByMeFragment,
  AnyPublicationFragment,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';

import { Operation, useOperation } from '../helpers';
import { useCollectController } from './adapters/useCollectController';

export type UseCollectArgs = {
  collector: ProfileOwnedByMeFragment;
  publication: AnyPublicationFragment;
};

export type CollectOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

export function useCollect({ collector, publication }: UseCollectArgs): CollectOperation {
  const collect = useCollectController();
  return useOperation(async () => collect(createCollectRequest(publication, collector)));
}
