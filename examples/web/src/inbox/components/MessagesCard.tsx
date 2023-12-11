import {
  CachedConversation,
  CachedMessageWithId,
  DecodedMessage,
  toCachedMessage,
  useMessages,
  useStreamMessages,
} from '@xmtp/react-sdk';
import { useCallback, useEffect, useState } from 'react';

type MessagesCardProps = {
  conversation: CachedConversation;
  walletAddress: string;
};

export function MessagesCard({ conversation, walletAddress }: MessagesCardProps) {
  const { messages } = useMessages(conversation);
  const [history, setHistory] = useState<CachedMessageWithId[]>([]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setHistory(messages);
    }
  }, [messages]);

  const onMessage = useCallback(
    (message: DecodedMessage) => {
      setHistory((prevMessages) => {
        const msgsnew = [
          ...prevMessages,
          toCachedMessage(message, walletAddress) as CachedMessageWithId,
        ];
        return msgsnew;
      });
    },
    [walletAddress],
  );

  useStreamMessages(conversation, { onMessage });

  return (
    <article>
      {history.length === 0 && <p>No messages yet</p>}

      {history.map((message) => (
        <div key={message.id} style={{ borderBottom: '1px solid' }}>
          <p>{message.content}</p>
          <p>{message.sentAt.toISOString()}</p>
        </div>
      ))}
    </article>
  );
}
