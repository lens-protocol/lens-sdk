import { RevenueAggregate, erc20Amount, fiatAmount } from '@lens-protocol/react-web';

import { formatAmount, formatFiatAmount } from '../../utils/formatAmount';

type RevenueCardProps = {
  revenue: RevenueAggregate;
};

export function RevenueCard({ revenue }: RevenueCardProps) {
  const erc20 = erc20Amount(revenue.total);
  const rate = revenue.total.rate ? fiatAmount(revenue.total.rate) : null;

  return (
    <div>
      <p>{`Currency: ${erc20.asset.name}`}</p>
      <p>{`Value: ${formatAmount(erc20)}`}</p>
      {rate && <p>{`Fiat value: ${formatFiatAmount(erc20, rate)}`}</p>}
    </div>
  );
}
