import { LinkCard } from '../components/LinkCard';

const publicationHooks = [
  {
    label: 'usePublication',
    description: `Fetch a single publication by it's ID.`,
    path: '/publications/usePublication',
  },
  {
    label: 'usePublications',
    description: `Fetch an array of publications, that match certain criteria, from a profile.`,
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
    label: 'useCreateComment',
    description: `Create a publication comment.`,
    path: '/publications/useCreateComment',
  },
  {
    label: 'useMirror',
    description: `Mirror a publication.`,
    path: '/publications/useMirror',
  },
  {
    label: 'useSearchPublications',
    description: `Fetch publications that match a query`,
    path: '/publications/useSearchPublications',
  },
  {
    label: 'useExplorePublications',
    description: `Fetch an array of publications that match certain explore criteria.`,
    path: '/publications/useExplorePublications',
  },
  {
    label: 'useReaction',
    description: `React to publications.`,
    path: '/publications/useReaction',
  },
  {
    label: 'useWhoReacted',
    description: `Check who reacted to a publication.`,
    path: '/publications/useWhoReacted',
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
