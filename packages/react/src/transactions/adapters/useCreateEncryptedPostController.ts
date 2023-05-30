import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { invariant } from '@lens-protocol/shared-kernel';

import { EncryptionConfig } from '../../config';
import { useSharedDependencies } from '../../shared';
import { useActiveWalletSigner, useWalletLogin } from '../../wallet';
import { AccessConditionBuilderFactory } from '../infrastructure/AccessConditionBuilderFactory';
import {
  CreateEncryptedPostRequest,
  EncryptedPublicationMetadataUploader,
} from '../infrastructure/EncryptedPublicationMetadataUploader';
import { PublicationIdPredictor } from '../infrastructure/PublicationIdPredictor';
import { createGatedClient } from '../infrastructure/createGatedClient';
import { CreatePostController } from './CreatePostController';
import { MetadataUploadHandler } from './MetadataUploadHandler';

export type UseCreatePostArgs = {
  encryption: EncryptionConfig;
  upload: MetadataUploadHandler;
};

export function useCreateEncryptedPostController({ encryption, upload }: UseCreatePostArgs) {
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

  return async (request: CreatePostRequest) => {
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

    const controller = new CreatePostController<CreateEncryptedPostRequest>({
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
