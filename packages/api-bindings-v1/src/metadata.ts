import { DeepOmit, Overwrite, Prettify } from '@lens-protocol/shared-kernel';

import type {
  DeepOmitTypename,
  EncryptionParamsOutput,
  Erc20OwnershipOutput,
  LeafConditionOutput,
  PublicationMetadataV2Input,
} from './lens';

export type PublicationMetadata = Prettify<
  Overwrite<PublicationMetadataV2Input, { version: '2.0.0' }>
>;

type OneOf<T, K extends keyof T = keyof T> = Omit<T, K> &
  {
    [k in K]: Pick<Required<T>, k> & {
      [k1 in Exclude<K, k>]?: null;
    };
  }[K];

type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type PatchLeafConditionOutput = Overwrite<
  LeafConditionOutput,
  {
    token: Omit<Erc20OwnershipOutput, 'name' | 'symbol'> | null;
  }
>;

export type LeafCondition = Prettify<
  OneOf<NonNullableFields<DeepOmitTypename<PatchLeafConditionOutput>>>
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

export type AnyCondition = LeafCondition | OrCondition<LeafCondition> | AndCondition<LeafCondition>;

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
