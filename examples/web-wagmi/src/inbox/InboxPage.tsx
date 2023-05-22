import { LinkCard } from '../components/LinkCard';

const inboxHooks = [
  {
    label: 'useConversations',
    description: `List all conversations.`,
    path: '/inbox/useConversations',
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
