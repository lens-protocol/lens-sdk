import { AttributeFragment, ProfileFieldsFragment } from '@lens-protocol/api-bindings';
import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  PartialAttributesUpdate,
  ProfileAttributeValue,
  UpdateCoverImageRequest,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { UnknownObject } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

function createProfileMetadataWrapper(data: UnknownObject) {
  return {
    version: '1.0.0',
    metadata_id: v4(),

    ...data,
  };
}

type AttributeData = {
  displayType?: string | null;
  key: string;
  traitType?: string;
  value: string;
};

function newAttribute(key: string, value: ProfileAttributeValue): AttributeData {
  if (value instanceof Date) {
    return {
      key,
      value: value.toISOString(),
      displayType: 'date',
    };
  }

  return {
    key,
    value: value.toString(),
    displayType: typeof value,
  };
}

function isProfileAttributeValue(
  value: ProfileAttributeValue | null,
): value is ProfileAttributeValue {
  return value !== null;
}

function resolveAttributes(attributes: AttributeFragment[], update: PartialAttributesUpdate = {}) {
  const remainder = { ...update };
  const updated = attributes.reduce((acc, attribute) => {
    const value = update[attribute.key];

    if (value === undefined) {
      acc.push(attribute);
      return acc;
    }
    delete remainder[attribute.key];

    if (value !== null) {
      acc.push(newAttribute(attribute.key, value));
    }
    return acc;
  }, [] as AttributeData[]);

  return [
    ...updated,
    ...Object.entries(remainder)
      .filter(
        (entry: [string, ProfileAttributeValue | null]): entry is [string, ProfileAttributeValue] =>
          isProfileAttributeValue(entry[1]),
      )
      .map(([key, value]) => newAttribute(key, value)),
  ];
}

export function createProfileMetadata(
  existingProfile: ProfileFieldsFragment,
  request: UpdateCoverImageRequest | UpdateProfileDetailsRequest,
) {
  switch (request.kind) {
    case TransactionKind.UPDATE_COVER_IMAGE:
      return createProfileMetadataWrapper({
        cover_picture: request.url,

        // supports partial updates
        attributes: resolveAttributes(existingProfile.__attributes ?? []),
        name: existingProfile.name,
        bio: existingProfile.bio,
      });
    case TransactionKind.UPDATE_PROFILE_DETAILS:
      return createProfileMetadataWrapper({
        name: request.details.name,
        bio: request.details.bio,

        attributes: resolveAttributes(
          existingProfile.__attributes ?? [],
          request.details.attributes,
        ),

        // supports partial updates
        cover_picture:
          existingProfile.coverPicture?.__typename === 'MediaSet'
            ? existingProfile.coverPicture.original.url
            : null,
      });
  }
}
