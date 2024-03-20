import { Amount, Asset, Erc20Amount, FiatAmount } from '@lens-protocol/react-web';

export function formatAmount(amount: Amount<Asset>): string {
  return `${amount.toSignificantDigits()} ${amount.asset.symbol}`;
}

export function formatFiatAmount(amount: Erc20Amount, rate?: FiatAmount | null): string {
  if (!rate) return '';

  const fiat = amount.convert(rate);
  return formatAmount(fiat);
}
