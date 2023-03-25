import { ProfileOwnedByMe } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CollectPolicyType,
  CreateCommentRequest,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { failure, invariant, Prettify, PromiseResult } from '@lens-protocol/shared-kernel';

import { EncryptionConfig } from '../config';
import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { useWalletLogin, useActiveWalletSigner } from '../wallet';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { CreateCommentController } from './adapters/useCreateCommentController';
import { AccessConditionBuilderFactory } from './infrastructure/AccessConditionBuilderFactory';
import {
  CreateEncryptedCommentRequest,
  EncryptedPublicationMetadataUploader,
} from './infrastructure/EncryptedPublicationMetadataUploader';
import { MetadataUploaderErrorMiddleware } from './infrastructure/MetadataUploaderErrorMiddleware';
import { PublicationIdPredictor } from './infrastructure/PublicationIdPredictor';
import { createGatedClient } from './infrastructure/createGatedClient';

export type UseCreateEncryptedCommentArgs = {
  encryption: EncryptionConfig;
  publisher: ProfileOwnedByMe;
  upload: MetadataUploadHandler;
};

export type CreateEncryptedCommentArgs = Prettify<
  Omit<
    CreateCommentRequest,
    'kind' | 'delegate' | 'collect' | 'profileId' | 'reference' | 'decryptionCriteria'
  > &
    Partial<Pick<CreateCommentRequest, 'collect' | 'reference'>> &
    Required<Pick<CreateCommentRequest, 'decryptionCriteria'>>
>;

export type CreateEncryptedCommentOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError,
  [CreateEncryptedCommentArgs]
>;

export function useCreateEncryptedComment({
  encryption,
  publisher,
  upload,
}: UseCreateEncryptedCommentArgs): CreateEncryptedCommentOperation {
  const {
    appId,
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
    }: CreateEncryptedCommentArgs): PromiseResult<
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

      const publicationIdPredictor = new PublicationIdPredictor(apolloClient, transactionGateway);

      const accessConditionBuilderFactory = new AccessConditionBuilderFactory(
        environment.chains,
        publicationIdPredictor,
      );

      const uploader = new EncryptedPublicationMetadataUploader(
        client,
        accessConditionBuilderFactory,
        new MetadataUploaderErrorMiddleware(upload),
      );

      const controller = new CreateCommentController<CreateEncryptedCommentRequest>({
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
          kind: TransactionKind.CREATE_COMMENT,
          collect,
          delegate: publisher.dispatcher !== null,
          profileId: publisher.id,
          reference,
          appId,
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
