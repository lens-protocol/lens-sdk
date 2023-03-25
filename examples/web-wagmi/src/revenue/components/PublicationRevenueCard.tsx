import { PublicationRevenue } from '@lens-protocol/react-web';

import { PublicationCard } from '../../publications/components/PublicationCard';

type RevenueCardProps = {
  publicationRevenue: PublicationRevenue;
};

export function PublicationRevenueCard({ publicationRevenue }: RevenueCardProps) {
  return (
    <section>
      <PublicationCard publication={publicationRevenue.publication} />

      <p>{`Currency: ${publicationRevenue.revenue.totalAmount.asset.name}`}</p>
      <p>{`Symbol: ${publicationRevenue.revenue.totalAmount.asset.symbol}`}</p>
      <p>{`Amount: ${publicationRevenue.revenue.totalAmount.toFixed(2)}`}</p>
    </section>
  );
}
