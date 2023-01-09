import { RevenueAggregateFragment } from '@lens-protocol/react';

type RevenueCardProps = {
  revenue: RevenueAggregateFragment;
};

export function RevenueCard({ revenue }: RevenueCardProps) {
  return (
    <article>
      <p>{`Currency: ${revenue.total.asset.name} `}</p>
      <p>{`Symbol: ${revenue.total.asset.symbol}`}</p>
      <p>{`Amount: ${revenue.total.value}`}</p>
    </article>
  );
}
