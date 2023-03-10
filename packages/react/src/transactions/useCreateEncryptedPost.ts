import { ProfileOwnedByMeFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CollectPolicyType,
  CreatePostRequest,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { failure, invariant, Prettify, PromiseResult } from '@lens-protocol/shared-kernel';

import { EncryptionConfig } from '../EncryptionConfig';
import { Operation, useOperation } from '../helpers';
import { useSharedDependencies } from '../shared';
import { useWalletLogin, useActiveWalletSigner } from '../wallet';
import { CreatePostController } from './adapters/CreatePostController';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import {
  CreateEncryptedPostRequest,
  EncryptedPublicationMetadataUploader,
} from './infrastructure/EncryptedPublicationMetadataUploader';
import { createGatedClient } from './infrastructure/createGatedClient';

export type UseCreateEncryptedPostArgs = {
  encryption: EncryptionConfig;
  publisher: ProfileOwnedByMeFragment;
  upload: MetadataUploadHandler;
};

export type CreateEncryptedPostArgs = Prettify<
  Omit<
    CreatePostRequest,
    'kind' | 'delegate' | 'collect' | 'profileId' | 'reference' | 'decryptionCriteria'
  > &
    Partial<Pick<CreatePostRequest, 'collect' | 'reference'>> &
    Required<Pick<CreatePostRequest, 'decryptionCriteria'>>
>;

export type CreateEncryptedPostOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError,
  [CreateEncryptedPostArgs]
>;

export function useCreateEncryptedPost({
  encryption,
  publisher,
  upload,
}: UseCreateEncryptedPostArgs): CreateEncryptedPostOperation {
  const {
    activeWallet,
    apolloClient,
    protocolCallRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    environment,
    storageProvider,
  } = useSharedDependencies();
  const { data: signer } = useActiveWalletSigner();

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreateEncryptedPostArgs): PromiseResult<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError
    > => {
      invariant(
        signer,
        `Cannot find the Active Wallet Signer, did you login with ${useWalletLogin.name}?`,
      );
      const client = createGatedClient({
        config: encryption.authentication,
        signer,
        encryptionProvider: encryption.provider,
        environment,
        storageProvider,
      });

      const uploader = new EncryptedPublicationMetadataUploader(client, environment.chains, upload);

      const controller = new CreatePostController<CreateEncryptedPostRequest>({
        activeWallet,
        apolloClient,
        protocolCallRelayer,
        transactionFactory,
        transactionGateway,
        transactionQueue,
        uploader,
      });

      try {
        return await controller.execute({
          kind: TransactionKind.CREATE_POST,
          collect,
          delegate: publisher.dispatcher !== null,
          profileId: publisher.id,
          reference,
          ...args,
        });
      } catch (err: unknown) {
        if (err instanceof FailedUploadError) {
          return failure(err);
        }
        throw err;
      }
    },
  );
}
