import { LinkCard } from '../components/LinkCard';

const inboxHooks = [
  {
    label: 'useEnhanceConversations',
    description: `List all conversations. Show a conversation with messages. Send a message.`,
    path: '/inbox/useEnhanceConversations',
  },
  {
    label: 'useStartLensConversation',
    description: `Start a new conversation.`,
    path: '/inbox/useStartLensConversation',
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
