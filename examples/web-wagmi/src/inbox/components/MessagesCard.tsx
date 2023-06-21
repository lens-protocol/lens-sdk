import { ConversationWithMessages } from '@lens-protocol/react-web';

type MessagesCardProps = {
  conversation: ConversationWithMessages;
};

export function MessagesCard({ conversation }: MessagesCardProps) {
  return (
    <article>
      {conversation.messages.map((message) => (
        <div key={message.id} style={{ borderBottom: '1px solid' }}>
          <p>{message.content}</p>
          <p>{message.sentAt.toISOString()}</p>
        </div>
      ))}
    </article>
  );
}
