import { PublicationMetadata } from '@lens-protocol/api-bindings';
import { DecryptionCriteria } from '@lens-protocol/domain/entities';
import {
  CreateCommentRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';
import * as GatedContent from '@lens-protocol/gated-content';
import { Overwrite, Prettify } from '@lens-protocol/shared-kernel';

import { IMetadataUploader } from '../adapters/IMetadataUploader';
import { AccessConditionBuilderFactory } from './AccessConditionBuilderFactory';
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
    private readonly accessConditionBuilderFactory: AccessConditionBuilderFactory,
    private readonly uploader: IMetadataUploader<PublicationMetadata>,
  ) {}

  async upload(request: T): Promise<string> {
    const accessCondition = await this.accessConditionBuilderFactory
      .createForPublicationBy(request.profileId)
      .withDecryptionCriteria(request.decryptionCriteria)
      .build();

    const metadata = createPublicationMetadata(request);

    const result = await this.client.encryptPublication(metadata, accessCondition);

    const encryptedMetadata = result.unwrap();

    return this.uploader.upload(encryptedMetadata);
  }
}
