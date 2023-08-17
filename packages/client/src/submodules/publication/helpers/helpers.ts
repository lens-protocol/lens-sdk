/**
 * @internal
 */
export type Typename<T> = { [key in '__typename']: T };

/**
 * @internal
 */
export type PickByTypename<T extends Typename<string>, P extends T['__typename']> = T extends {
  __typename?: P;
}
  ? T
  : never;

/**
 * Check if publication is a {@link PostFragment}.
 *
 * @param publication - publication to check
 * @returns true if the result is a {@link PostFragment}
 */
export function isPostPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Post'> {
  return publication.__typename === 'Post';
}

/**
 * Check if publication is a {@link CommentFragment}.
 *
 * @param publication - publication to check
 * @returns true if the result is a {@link CommentFragment}
 */
export function isCommentPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Comment'> {
  return publication.__typename === 'Comment';
}

/**
 * Check if publication is a {@link MirrorFragment}.
 *
 * @param publication - publication to check
 * @returns true if the result is a {@link MirrorFragment}
 */
export function isMirrorPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Mirror'> {
  return publication.__typename === 'Mirror';
}
