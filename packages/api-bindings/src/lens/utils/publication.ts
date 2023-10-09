import { PickByTypename, Typename } from './types';

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
