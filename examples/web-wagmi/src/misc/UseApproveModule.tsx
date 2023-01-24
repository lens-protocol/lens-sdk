import { Erc20, useApproveModule, useCurrencies } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';

type UseApproveModuleInnerProps = {
  amount: number
  erc: Erc20,
  spender: string
}

function UseApproveModuleInner({ amount, erc, spender }: UseApproveModuleInnerProps) {
}

export function UseApproveModule() {
  const { data: currencies, loading } = useCurrencies();

  if (loading) return <Loading />;

  return (
    <div>
      <h1>
        <code>useApproveModule</code>
      </h1>
      <input type="number" />
      <select>
        {currencies.map((currency) => <option key={currency.address}>{currency.symbol}</option>) }
      </select>
    </div>
  );
}
