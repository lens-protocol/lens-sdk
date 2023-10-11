import { LinkCard } from '../components/LinkCard';

const publicationHooks = [
  {
    label: 'usePublication',
    description: `Fetch a single publication.`,
    path: '/publications/usePublication',
  },
  {
    label: 'usePublications',
    description: `Fetch a list of publications.`,
    path: '/publications/usePublications',
  },
  {
    label: 'useWhoReactedToPublication',
    description: `Fetch a list of profiles who reacted to a publication.`,
    path: '/publications/useWhoReactedToPublication',
  },
  {
    label: 'useReactionToggle',
    description: `Add or remove a reaction to a publication.`,
    path: '/publications/useReactionToggle',
  },
];

export function PublicationsPage() {
  return (
    <div>
      <h1>Publications</h1>

      {publicationHooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
