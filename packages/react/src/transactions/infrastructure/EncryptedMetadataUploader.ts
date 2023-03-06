import { DecryptionCriteria, DecryptionCriteriaType } from '@lens-protocol/domain/entities';
import {
  CreateCommentRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';
import * as GatedContent from '@lens-protocol/gated-content';
import { Overwrite, Prettify } from '@lens-protocol/shared-kernel';
import { IStorageProvider } from '@lens-protocol/storage';
import { Signer } from 'ethers';

import { ChainConfigRegistry } from '../../chains';
import { EnvironmentConfig, production } from '../../environments';
import { IMetadataUploader } from '../adapters/IMetadataUploader';
import { MetadataUploadHandler } from '../adapters/MetadataUploadHandler';
import { createAccessCondition, FullyQualifiedDecryptionCriteria } from './createAccessCondition';
import { createPublicationMetadata } from './createPublicationMetadata';

type WithDecryptionCriteria<T extends CreatePostRequest | CreateCommentRequest> = Prettify<
  Overwrite<
    T,
    {
      decryptionCriteria: DecryptionCriteria;
    }
  >
>;

function resolveGatedEnvironment(environment: EnvironmentConfig): GatedContent.EnvironmentConfig {
  if (environment === production) {
    return GatedContent.production;
  }
  return GatedContent.staging;
}

export type CreateEncryptedPostRequest = WithDecryptionCriteria<CreatePostRequest>;

export type CreateEncryptedCommentRequest = WithDecryptionCriteria<CreateCommentRequest>;

export type EncryptedPublicationMetadataUploaderConfig = GatedContent.AuthenticationConfig;

export type EncryptedPublicationMetadataUploaderArgs = {
  config: GatedContent.AuthenticationConfig;
  encryptionProvider: GatedContent.IEncryptionProvider;
  environment: EnvironmentConfig;
  signer: Signer;
  storageProvider: IStorageProvider;
  upload: MetadataUploadHandler;
};

export class EncryptedPublicationMetadataUploader<
  T extends WithDecryptionCriteria<
    CreatePostRequest | CreateCommentRequest
  > = WithDecryptionCriteria<CreatePostRequest | CreateCommentRequest>,
> implements IMetadataUploader<T>
{
  private constructor(
    private readonly client: GatedContent.GatedClient,
    private readonly chains: ChainConfigRegistry,
    private readonly handler: MetadataUploadHandler,
  ) {}

  async upload(request: T): Promise<string> {
    const qualifiedDecryptionCriteria: FullyQualifiedDecryptionCriteria = {
      type: DecryptionCriteriaType.OR,
      or: [
        {
          type: DecryptionCriteriaType.PROFILE_OWNERSHIP,
          profileId: request.profileId,
        },
        request.decryptionCriteria,
      ],
    };

    const accessCondition = createAccessCondition(qualifiedDecryptionCriteria, this.chains);

    const metadata = createPublicationMetadata(request);

    const result = await this.client.encryptPublication(metadata, accessCondition);

    const encryptedMetadata = result.unwrap();

    return this.handler(encryptedMetadata);
  }

  static create({
    config,
    encryptionProvider,
    environment,
    signer,
    storageProvider,
    upload,
  }: EncryptedPublicationMetadataUploaderArgs): EncryptedPublicationMetadataUploader {
    const client = new GatedContent.GatedClient({
      authentication: config,
      signer,
      environment: resolveGatedEnvironment(environment),
      encryptionProvider: encryptionProvider,
      storageProvider,
    });

    return new EncryptedPublicationMetadataUploader(client, environment.chains, upload);
  }
}
