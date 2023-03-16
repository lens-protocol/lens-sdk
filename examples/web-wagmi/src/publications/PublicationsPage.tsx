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
    label: 'useComments',
    description: `Fetch comments of a publications.`,
    path: '/publications/useComments',
  },
  {
    label: 'useCollectedPublications',
    description: `Fetch publications collected by a wallet address.`,
    path: '/publications/useCollectedPublications',
  },
  {
    label: 'useCreatePost',
    description: `Create a post.`,
    path: '/publications/useCreatePost',
  },
  {
    label: 'useCreateEncryptedPost',
    description: `Create an encrypted post.`,
    path: '/publications/useCreateEncryptedPost',
  },
  {
    label: 'useCreateComment',
    description: `Create a comment.`,
    path: '/publications/useCreateComment',
  },
  {
    label: 'useCreateMirror',
    description: `Mirror a publication.`,
    path: '/publications/useCreateMirror',
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
  {
    label: 'useReportPublication',
    description: `Report a publication.`,
    path: '/publications/useReportPublication',
  },
  {
    label: 'useHidePublication',
    description: `Hide a publication.`,
    path: '/publications/useHidePublication',
  },
  {
    label: 'useWhoCollectedPublication',
    description: `Check who collected a publication.`,
    path: '/publications/useWhoCollectedPublication',
  },
  {
    label: 'useWhoMirroredPublication',
    description: 'Fetch profiles that have mirrored a specific publication.',
    path: '/publications/useWhoMirroredPublication',
  },
  {
    label: 'useCollect',
    description: `Collect a publication.`,
    path: '/publications/useCollect',
  },
  {
    label: 'useProfilePublicationsForSale',
    description: 'Fetch profile publications for sale.',
    path: '/publications/useProfilePublicationsForSale',
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
