import { LinkCard } from '../components/LinkCard';

const publicationHooks = [
  {
    label: 'useCreatePost',
    description: `Create a post.`,
    path: '/publications/useCreatePost',
  },
  {
    label: 'CreateComment',
    description: `Leave a comment on another publication.`,
    path: '/publications/useCreateComment',
  },
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
    label: 'useHidePublication',
    description: `Hide a publication.`,
    path: '/publications/useHidePublication',
  },
  {
    label: 'useReportPublication',
    description: `Report a publication.`,
    path: '/publications/useReportPublication',
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
