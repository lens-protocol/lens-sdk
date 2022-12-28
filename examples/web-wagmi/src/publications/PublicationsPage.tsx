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
  {
    label: 'useCreatePost',
    description: `Create a publication post.`,
    path: '/publications/useCreatePost',
  },
  {
    label: 'useCollectedPublications',
    description: `Fetch publications collected by a wallet address.`,
    path: '/publications/useCollectedPublications',
  },
  {
    label: 'useComments',
    description: `Fetch comments of a publications.`,
    path: '/publications/useComments',
  },
  {
    label: 'useExplorePublications',
    description: `Fetch an array of publications explore criteria.`,
    path: '/publications/useExplorePublications'
  }
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
