import { LinkCard } from '../components/LinkCard';

const inboxHooks = [
  {
    label: 'useConversations',
    description: `List all conversations. Show a conversation with messages. Send a message.`,
    path: '/inbox/useConversations',
  },
  {
    label: 'useCreateConversation',
    description: `Start a new conversation.`,
    path: '/inbox/useCreateConversation',
  },
];

export function InboxPage() {
  return (
    <div>
      <h1>Inbox</h1>

      {inboxHooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
