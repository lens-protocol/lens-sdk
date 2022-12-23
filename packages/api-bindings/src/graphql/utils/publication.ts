import { Typename, PickByTypename } from './types';

export const isPostPublication = <T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Post'> => {
  return publication.__typename === 'Post';
};

export const isCommentPublication = <T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Comment'> => {
  return publication.__typename === 'Comment';
};

export const isMirrorPublication = <T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Mirror'> => {
  return publication.__typename === 'Mirror';
};
