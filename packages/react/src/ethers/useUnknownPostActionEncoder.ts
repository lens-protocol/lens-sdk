import type {
  EvmAddress,
  Post,
  PostAction,
  UnknownPostAction,
} from '@lens-protocol/client';
import {
  type EncodedParam,
  encodeKeyValuePairs,
} from '@lens-protocol/client/ethers';
import { useMemo } from 'react';

/**
 * Hook to create a parameter encoder for unknown post actions
 */
export function useUnknownPostActionEncoder(
  post: Post | null,
  address: EvmAddress,
): (params: Record<string, unknown>) => EncodedParam[] {
  return useMemo(() => {
    if (!post?.actions) return () => [];

    const action = post.actions.find(
      (a: PostAction) => a.address === address,
    ) as UnknownPostAction | undefined;

    if (!action?.metadata?.executeParams) return () => [];

    return (params: Record<string, unknown>) =>
      encodeKeyValuePairs(params, action.metadata?.executeParams || []);
  }, [post, address]);
}
