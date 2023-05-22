import type { Conversation, ConversationsDisabledError } from '@lens-protocol/domain/entities';
import { invariant } from '@lens-protocol/shared-kernel';
import { useEffect, useState } from 'react';

import type { ReadResult } from '../helpers/reads';
import { useActiveProfile } from '../profile';
import { useGetAllConversationsController } from './adapters/useGetAllConversationsController';
import type { InboxConfig } from './config';

export type ConversationData = Conversation;

export type UseConversationsArgs = {
  config: InboxConfig;
};

/**
 * @internal
 * @experimental
 */
export function useConversations(
  args: UseConversationsArgs,
): ReadResult<ConversationData[], ConversationsDisabledError> {
  const { data: profile } = useActiveProfile();
  const execute = useGetAllConversationsController(args.config);

  const [data, setData] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ConversationsDisabledError>();

  useEffect(() => {
    if (!profile) {
      return;
    }

    void (async () => {
      setLoading(true);
      setError(undefined);

      const result = await execute({
        profileId: profile.id,
      });

      if (result.isFailure()) {
        setError(result.error);
      }

      if (result.isSuccess()) {
        setData(result.value);
      }

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error,
      loading: false,
    };
  }

  invariant(data, 'Data should be defined');

  return {
    data,
    error: undefined,
    loading: false,
  };
}
