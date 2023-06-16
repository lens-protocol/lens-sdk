import { LinkCard } from '../components/LinkCard';

const pages = [
  {
    label: 'Login to specific profile',
    description: `Login to a specific profile by handle`,
    path: '/authentication/loginSpecificProfile',
  },
];

export function AuthenticationPage() {
  return (
    <div>
      <h1>Authentication</h1>

      {pages.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
