import { PublicationRevenue } from '@lens-protocol/react-web';

import { PublicationCard } from '../../components/cards';
import { RevenueCard } from './RevenueCard';

type RevenueCardProps = {
  publicationRevenue: PublicationRevenue;
};

export function PublicationRevenueCard({
  publicationRevenue: { publication, revenue },
}: RevenueCardProps) {
  return (
    <section>
      <PublicationCard publication={publication} />

      {revenue.length ? (
        revenue.map((r, index) => <RevenueCard key={index} revenue={r} />)
      ) : (
        <p>No revenue.</p>
      )}
    </section>
  );
}
