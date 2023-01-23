import { AttributeFragment, ProfileFragment } from '@lens-protocol/api-bindings';
import {
  PartialAttributesUpdate,
  ProfileAttributeValue,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { v4 } from 'uuid';

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

function extractCoverImageUrl(existingProfile: ProfileFragment): string | null {
  return existingProfile.coverPicture?.__typename === 'MediaSet'
    ? existingProfile.coverPicture.original.url
    : null;
}

function coalesce<T>(lhs: T | undefined, rhs: T): T {
  return lhs !== undefined ? lhs : rhs;
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
  existingProfile: ProfileFragment,
  request: UpdateProfileDetailsRequest,
) {
  return {
    version: '1.0.0',
    metadata_id: v4(),

    attributes: resolveAttributes(existingProfile.__attributes ?? [], request.attributes),
    bio: coalesce(request.bio, existingProfile.bio),
    cover_picture: coalesce(request.coverPicture, extractCoverImageUrl(existingProfile)),
    name: request.name,
  };
}
