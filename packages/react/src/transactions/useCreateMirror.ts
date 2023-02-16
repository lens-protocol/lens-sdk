import {
  CommentFragment,
  PostFragment,
  ProfileOwnedByMeFragment,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';

import { Operation, useOperation } from '../helpers';
import { useCreateMirrorController } from './adapters/useCreateMirrorController';

export type UseCreateMirrorArgs = {
  publisher: ProfileOwnedByMeFragment;
};

export type CreateMirrorArgs = {
  publication: PostFragment | CommentFragment;
};

export type CreateMirrorOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  [CreateMirrorArgs]
>;

export function useCreateMirror({ publisher }: UseCreateMirrorArgs): CreateMirrorOperation {
  const createMirror = useCreateMirrorController();

  return useOperation(async ({ publication }: CreateMirrorArgs) =>
    createMirror({
      kind: TransactionKind.MIRROR_PUBLICATION,
      publicationId: publication.id,
      profileId: publisher.id,
      delegate: publisher.dispatcher !== null,
    }),
  );
}
