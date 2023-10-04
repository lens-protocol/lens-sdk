import { LinkCard } from '../components/LinkCard';

const searchHooks = [
  {
    label: 'useSearchPublications',
    description: 'Search for publications using filters.',
    path: '/search/useSearchPublications',
  },
];

export function SearchPage() {
  return (
    <div>
      <h1>Search</h1>

      {searchHooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
