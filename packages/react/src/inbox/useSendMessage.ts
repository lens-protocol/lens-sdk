import { UnspecifiedError } from '@lens-protocol/api-bindings';
import type {
  ConversationId,
  ConversationNotFoundError,
  ConversationsDisabledError,
  Markdown,
  Message,
} from '@lens-protocol/domain/entities';
import { Prettify, failure, success } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { Operation, useOperation } from '../helpers/operations';
import { useActiveProfile } from '../profile';
import { useSendMessageController } from './adapters/useSendMessageController';
import type { InboxConfig } from './config';

export type UseSendMessageArgs = {
  config: InboxConfig;
};

export type SendMessageRequest = {
  conversationId: ConversationId;
  content: Markdown;
};

export type UseSendMessageResult = Prettify<
  Operation<
    Message,
    ConversationsDisabledError | ConversationNotFoundError | UnspecifiedError,
    [SendMessageRequest]
  > & {
    data: Message | undefined;
  }
>;

/**
 * @internal
 * @experimental
 */
export function useSendMessage(args: UseSendMessageArgs): UseSendMessageResult {
  const { data: profile, error } = useActiveProfile();
  const execute = useSendMessageController(args.config);
  const [dataResult, setDataResult] = useState<Message>();

  return {
    ...useOperation(async (request: SendMessageRequest) => {
      if (error) {
        return failure(error);
      }

      if (!profile) {
        return failure(new UnspecifiedError(new Error('No profile found')));
      }

      const result = await execute({
        conversationId: request.conversationId,
        content: request.content,
        profileId: profile.id,
      });

      if (result.isSuccess()) {
        setDataResult(result.value);
        return success(result.value);
      }

      return failure(result.error);
    }),
    data: dataResult,
  };
}
