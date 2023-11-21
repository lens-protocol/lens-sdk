import { PublicationId } from '@lens-protocol/domain/entities';

import { AnyPublication, PrimaryPublication } from '../publication';
import { PickByTypename, Typename } from './types';

const publicationIdRegExp = /^0x[a-f0-9]{2,}-0x[a-f0-9]{2,}/i;

/**
 * @group Helpers
 */
export function isPublicationId(value: string): value is PublicationId {
  return publicationIdRegExp.test(value);
}

/**
 * @group Helpers
 */
export function isPostPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Post'> {
  return publication.__typename === 'Post';
}

/**
 * @group Helpers
 */
export function isCommentPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Comment'> {
  return publication.__typename === 'Comment';
}

/**
 * @group Helpers
 */
export function isMirrorPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Mirror'> {
  return publication.__typename === 'Mirror';
}

/**
 * @group Helpers
 */
export function isQuotePublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Quote'> {
  return publication.__typename === 'Quote';
}

/**
 * @group Helpers
 */
export function isPrimaryPublication(
  publication: AnyPublication,
): publication is PrimaryPublication {
  return (
    isCommentPublication(publication) ||
    isPostPublication(publication) ||
    isQuotePublication(publication)
  );
}
