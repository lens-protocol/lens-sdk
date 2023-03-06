import { DeepOmit, Overwrite, Prettify } from '@lens-protocol/shared-kernel';

import type {
  DeepOmitTypename,
  EncryptionParamsOutput,
  PublicationMetadataV2Input,
  RootConditionFragment,
} from './graphql';

export type PublicationMetadata = Prettify<
  Overwrite<PublicationMetadataV2Input, { version: '2.0.0' }>
>;

export type AccessCondition = DeepOmitTypename<RootConditionFragment>;

export type EncryptedFields = Pick<
  PublicationMetadata,
  'animation_url' | 'content' | 'external_url' | 'image' | 'media'
>;

type EncryptionParams = Prettify<
  Overwrite<
    DeepOmit<EncryptionParamsOutput, '__typename'>,
    {
      accessCondition: AccessCondition;
      encryptedFields: EncryptedFields;
    }
  >
>;

export type GatedPublicationMetadata = Prettify<
  Overwrite<
    PublicationMetadata,
    {
      encryptionParams: EncryptionParams;
    }
  >
>;

export type ProfileMetadataAttribute = {
  displayType?: string | null;
  key: string;
  traitType?: string;
  value: string;
};

export type ProfileMetadata = {
  version: '1.0.0';
  metadata_id: string;
  attributes: ProfileMetadataAttribute[];
  bio: string | null;
  cover_picture: string | null;
  name: string;
};
