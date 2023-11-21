import { Link } from 'react-router-dom';

type LinkCardProps = {
  path: string;
  label: string;
  description: string;
};

export function LinkCard({ path, label, description }: LinkCardProps) {
  return (
    <article key={path}>
      <h3>
        <code>{label}</code>
      </h3>
      <p>{description}</p>
      <Link to={path}>View example</Link>
    </article>
  );
}
