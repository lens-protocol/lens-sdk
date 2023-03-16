import { RevenueAggregateFragment } from '@lens-protocol/react-web';

type RevenueCardProps = {
  revenue: RevenueAggregateFragment;
};

export function RevenueCard({ revenue }: RevenueCardProps) {
  return (
    <article>
      <p>{`Currency: ${revenue.totalAmount.asset.name} `}</p>
      <p>{`Symbol: ${revenue.totalAmount.asset.symbol}`}</p>
      <p>{`Amount: ${revenue.totalAmount.toFixed(2)}`}</p>
    </article>
  );
}
