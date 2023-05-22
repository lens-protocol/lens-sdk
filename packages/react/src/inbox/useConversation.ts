import type {
  ConversationId,
  ConversationWithMessages,
  ConversationsDisabledError,
} from '@lens-protocol/domain/entities';
import { invariant } from '@lens-protocol/shared-kernel';
import { useEffect, useState } from 'react';

import type { ReadResult } from '../helpers/reads';
import { useActiveProfile } from '../profile';
import { useGetConversationController } from './adapters/useGetConversationController';
import type { InboxConfig } from './config';

export type ConversationWithMessagesData = ConversationWithMessages;

export type UseConversationArgs = {
  config: InboxConfig;
  conversationId: ConversationId;
};

/**
 * @internal
 * @experimental
 */
export function useConversation(
  args: UseConversationArgs,
): ReadResult<ConversationWithMessagesData | null, ConversationsDisabledError> {
  const { data: profile } = useActiveProfile();
  const execute = useGetConversationController(args.config);

  const [data, setData] = useState<ConversationWithMessages | null>();
  const [loading, setLoading] = useState<boolean>(true);
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
        conversationId: args.conversationId,
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
