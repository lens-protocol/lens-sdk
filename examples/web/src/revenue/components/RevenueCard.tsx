import { RevenueAggregate, erc20Amount, fiatAmount } from '@lens-protocol/react-web';

type RevenueCardProps = {
  revenue: RevenueAggregate;
};

function ConversionRate({ revenue }: RevenueCardProps) {
  if (revenue.total.rate) {
    const rate = fiatAmount(revenue.total.rate);
    const fiat = erc20Amount(revenue.total).convert(rate);
    return <p>{`Fiat value: ${fiat.toSignificantDigits()} ${fiat.asset.symbol}`}</p>;
  }
  return null;
}

export function RevenueCard({ revenue }: RevenueCardProps) {
  const erc20 = erc20Amount(revenue.total);

  return (
    <div>
      <p>{`Currency: ${erc20.asset.name}`}</p>
      <p>{`Value: ${erc20.toSignificantDigits()} ${erc20.asset.symbol}`}</p>

      <ConversionRate revenue={revenue} />
    </div>
  );
}
