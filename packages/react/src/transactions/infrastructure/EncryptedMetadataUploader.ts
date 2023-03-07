import { DecryptionCriteria, DecryptionCriteriaType } from '@lens-protocol/domain/entities';
import {
  CreateCommentRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';
import * as GatedContent from '@lens-protocol/gated-content';
import { Overwrite, Prettify } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry } from '../../chains';
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

export type CreateEncryptedPostRequest = WithDecryptionCriteria<CreatePostRequest>;

export type CreateEncryptedCommentRequest = WithDecryptionCriteria<CreateCommentRequest>;

export class EncryptedPublicationMetadataUploader<
  T extends WithDecryptionCriteria<
    CreatePostRequest | CreateCommentRequest
  > = WithDecryptionCriteria<CreatePostRequest | CreateCommentRequest>,
> implements IMetadataUploader<T>
{
  constructor(
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
}
