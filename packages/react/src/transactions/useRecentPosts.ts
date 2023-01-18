import { useReactiveVar } from '@apollo/client';

import { recentPosts } from './adapters/responders/CreatePostResponder';

export function useRecentPosts() {
  return useReactiveVar(recentPosts);
}
