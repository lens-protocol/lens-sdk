import { DeepOmit, Overwrite, Prettify } from '@lens-protocol/shared-kernel';

import type {
  DeepOmitTypename,
  EncryptionParamsOutput,
  LeafConditionFragment,
  PublicationMetadataV2Input,
} from './graphql';

export type PublicationMetadata = Prettify<
  Overwrite<PublicationMetadataV2Input, { version: '2.0.0' }>
>;

type OneOf<T, K extends keyof T = keyof T> = Omit<T, K> &
  {
    [k in K]: Pick<Required<T>, k> & {
      [k1 in Exclude<K, k>]?: never;
    };
  }[K];

type NonNullableFields<T> = {
  [P in keyof T]: Prettify<NonNullable<T[P]>>;
};

export type LeafCondition = Prettify<
  OneOf<NonNullableFields<DeepOmitTypename<LeafConditionFragment>>>
>;

export type OrCondition<T> = {
  or: {
    criteria: T[];
  };
};

export type AndCondition<T> = {
  and: {
    criteria: T[];
  };
};

export type AnyCondition = OrCondition<LeafCondition> | AndCondition<LeafCondition> | LeafCondition;

export type AccessCondition = OrCondition<AnyCondition>;

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
