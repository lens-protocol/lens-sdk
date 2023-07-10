import { recentPosts } from './adapters/responders/CreatePostResponder';

/**
 * @category Publications
 * @group Hooks
 */
export function useClearRecentPosts() {
  return () => {
    recentPosts([]);
  };
}
