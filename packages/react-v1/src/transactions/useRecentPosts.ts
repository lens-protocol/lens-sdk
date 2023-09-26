import { useReactiveVar } from '@apollo/client';

import { recentPosts } from './adapters/responders/CreatePostResponder';

/**
 * @category Publications
 * @group Hooks
 */
export function useRecentPosts() {
  return useReactiveVar(recentPosts);
}
