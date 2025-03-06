import { invariant } from '@lens-protocol/types';
import type { AnyPost, Post } from './fragments';

/**
 * Refine the type of a Post from AnyPost.
 */
export function justPost(post: AnyPost): Post {
  invariant(post.__typename === 'Post', `Expected AnyPost ${post.id} to be a Post`);
  return post;
}
