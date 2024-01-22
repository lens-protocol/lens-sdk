import { RevenueAggregate, erc20Amount } from '@lens-protocol/react-web';

type RevenueCardProps = {
  revenue: RevenueAggregate;
};

export function RevenueCard({ revenue }: RevenueCardProps) {
  return (
    <div>
      <p>{`Currency: ${revenue.total.asset.name}`}</p>
      <p>{`Symbol: ${revenue.total.asset.symbol}`}</p>
      <p>{`Amount: ${revenue.total.value}`}</p>
      <p>{`Dollar value: ${erc20Amount(revenue.total)
        .mul(revenue.total.rate?.value || 1)
        .toSignificantDigits(2)} ${revenue.total.rate?.asset.symbol}`}</p>
    </div>
  );
}
