import { RevenueAggregate } from '@lens-protocol/react-web';

type RevenueCardProps = {
  revenue: RevenueAggregate;
};

export function RevenueCard({ revenue }: RevenueCardProps) {
  return (
    <div>
      <p>{`Currency: ${revenue.total.asset.name}`}</p>
      <p>{`Symbol: ${revenue.total.asset.symbol}`}</p>
      <p>{`Amount: ${revenue.total.value}`}</p>
    </div>
  );
}
