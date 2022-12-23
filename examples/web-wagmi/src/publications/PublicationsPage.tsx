import { LinkCard } from '../components/LinkCard';

const publicationHooks = [
  {
    label: 'usePublication',
    description: `Fetch a single publication by it's ID.`,
    path: '/publications/usePublication',
  },
  {
    label: 'usePublications',
    description: `Fetch an array of publications that match certain criteria.`,
    path: '/publications/usePublications',
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
