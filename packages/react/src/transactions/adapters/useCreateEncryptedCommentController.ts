import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import { invariant } from '@lens-protocol/shared-kernel';

import { EncryptionConfig } from '../../config';
import { useSharedDependencies } from '../../shared';
import { useActiveWalletSigner, useWalletLogin } from '../../wallet';
import { AccessConditionBuilderFactory } from '../infrastructure/AccessConditionBuilderFactory';
import {
  CreateEncryptedCommentRequest,
  EncryptedPublicationMetadataUploader,
} from '../infrastructure/EncryptedPublicationMetadataUploader';
import { PublicationIdPredictor } from '../infrastructure/PublicationIdPredictor';
import { createGatedClient } from '../infrastructure/createGatedClient';
import { CreateCommentController } from './CreateCommentController';
import { MetadataUploadHandler } from './MetadataUploadHandler';

export type UseCreateCommentArgs = {
  encryption: EncryptionConfig;
  upload: MetadataUploadHandler;
};

export function useCreateEncryptedCommentController({ encryption, upload }: UseCreateCommentArgs) {
  const {
    activeWallet,
    apolloClient,
    offChainRelayer,
    onChainRelayer,
    storageProvider,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    environment,
  } = useSharedDependencies();
  const { data: signer } = useActiveWalletSigner();

  return async (request: CreateCommentRequest) => {
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

    const uploader = EncryptedPublicationMetadataUploader.create(
      client,
      accessConditionBuilderFactory,
      upload,
    );

    const controller = new CreateCommentController<CreateEncryptedCommentRequest>({
      activeWallet,
      apolloClient,
      offChainRelayer,
      onChainRelayer,
      transactionFactory,
      transactionGateway,
      transactionQueue,
      uploader,
    });

    return controller.execute(request);
  };
}
