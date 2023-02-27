import { DeepOmit, Overwrite, Prettify } from '@lens-protocol/shared-kernel';

import type { EncryptionParamsOutput, PublicationMetadataV2Input } from './graphql';

export type PublicationMetadata = Prettify<
  Overwrite<PublicationMetadataV2Input, { version: '2.0.0' }>
>;

type EncryptionParams = DeepOmit<EncryptionParamsOutput, '__typename'>;

export type EncryptedPublicationMetadata = Prettify<
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
