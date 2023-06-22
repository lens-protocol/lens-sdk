import { Conversation, DecodedMessage, useMessages, useStreamMessages } from '@xmtp/react-sdk';
import { useCallback, useEffect, useState } from 'react';

type MessagesCardProps = {
  conversation: Conversation;
};

export function MessagesCard({ conversation }: MessagesCardProps) {
  const { messages } = useMessages(conversation);
  const [history, setHistory] = useState<DecodedMessage[]>([]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setHistory(messages);
    }
  }, [messages]);

  const onMessage = useCallback((message: DecodedMessage) => {
    setHistory((prevMessages) => {
      const msgsnew = [...prevMessages, message];
      return msgsnew;
    });
  }, []);

  useStreamMessages(conversation, onMessage);

  return (
    <article>
      {history.length === 0 && <p>No messages yet</p>}

      {history.map((message) => (
        <div key={message.id} style={{ borderBottom: '1px solid' }}>
          <p>{message.content}</p>
          <p>{message.sent.toISOString()}</p>
        </div>
      ))}
    </article>
  );
}
