import { RevenueAggregateFragment } from '@lens-protocol/react';

type RevenueCardProps = {
  revenue: RevenueAggregateFragment;
};

export function RevenueCard({ revenue }: RevenueCardProps) {
  const amount = revenue.total.asAmount;
  return (
    <article>
      <p>{`Currency: ${amount.asset.name} `}</p>
      <p>{`Symbol: ${amount.asset.symbol}`}</p>
      <p>{`Amount: ${amount.toFixed(2)}`}</p>
    </article>
  );
}
