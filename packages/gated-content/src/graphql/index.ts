import { Overwrite, Primitive } from '@lens-protocol/shared-kernel';

import { PublicationMetadata, Maybe } from './generated';

export * from './generated';

type PrettyIntersection<S, T> = { [K in keyof (S & T)]: (S & T)[K] };

type WithTypename = { __typename: string };

type FragmentWithTypename<ObjectType extends WithTypename> = PrettyIntersection<
  {
    readonly __typename: NonNullable<ObjectType['__typename']>;
  },
  {
    [KeyType in keyof Omit<ObjectType, '__typename'>]?: FragmentOf<ObjectType[KeyType]>;
  }
>;

/**
 * Generic helper type that ensures any fragment of a given node is allowed.
 *
 * Fragments must include `__typename` at all levels.
 *
 * @internal
 */
export type FragmentOf<T> = T extends Primitive
  ? T
  : T extends object
  ? T extends ReadonlyArray<infer ItemType>
    ? ReadonlyArray<FragmentOf<ItemType>>
    : T extends WithTypename
    ? FragmentWithTypename<T>
    : never
  : unknown;

/**
 * Helper that narrows down the type of `encryptedWith` in union types.
 *
 * @internal
 */
type EncryptablePublicationMetadata<EncryptionStrategy> = {
  encryptedWith?: Maybe<EncryptionStrategy>;
};

/**
 * Helper that ensures that `encryptedWith` field is present in the metadata fragment.
 *
 * @internal
 */
export type EncryptedFragmentOf<Metadata extends EncryptablePublicationMetadata<unknown>> =
  Metadata extends EncryptablePublicationMetadata<infer EncryptionStrategy>
    ? Overwrite<
        FragmentOf<Metadata>,
        {
          encryptedWith: EncryptionStrategy;
        }
      >
    : never;

/**
 * Any fragment of `PublicationMetadata` with `encryptedWith` field defined.
 *
 * Fragments must include `__typename` at all levels.
 */
export type EncryptedFragmentOfAnyPublicationMetadata = EncryptedFragmentOf<PublicationMetadata>;

/**
 * Any encryptable `PublicationMetadata` fragment.
 */
export type EncryptablePublicationMetadataFragment = Pick<PublicationMetadata, 'encryptedWith'>;
/**
 * Type guard that checks if a Publication Metadata fragment is encrypted.
 *
 * @param metadata - any supported metadata fragment
 */
export function isEncryptedPublicationMetadata(
  metadata: EncryptablePublicationMetadataFragment,
): metadata is EncryptedFragmentOfAnyPublicationMetadata {
  return !!metadata.encryptedWith;
}
