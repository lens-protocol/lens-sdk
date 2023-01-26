import {
  Amount,
  EnabledModuleFragment,
  Erc20,
  useApproveModule,
  useCurrencies,
  useEnabledModules,
} from '@lens-protocol/react';
import { ChangeEvent, useState } from 'react';

import { Loading } from '../components/loading/Loading';

type UseApproveModuleFormProps = {
  currencies: Erc20[];
  modules: EnabledModuleFragment[];
};

function UseApproveModuleForm({ currencies, modules }: UseApproveModuleFormProps) {
  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const [selectedModule, setSelectedModule] = useState(0);

  const { approve, isPending, isApproved } = useApproveModule({
    spender: modules[selectedModule].contractAddress,
    amount: Amount.erc20(currencies[selectedCurrency], amount),
  });

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setAmount(0);
    else setAmount(e.target.valueAsNumber);
  };

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedCurrency(Number(e.target.value));

  const handleModuleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedModule(Number(e.target.value));

  const handleApprove = () => approve();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>Amount</span>
      <input type="number" min={0} value={amount} onChange={handleAmountChange} />
      <span>Currency</span>
      <select value={selectedCurrency} onChange={handleCurrencyChange}>
        {currencies.map((currency, index) => (
          <option key={currency.address} value={index}>
            {currency.symbol}
          </option>
        ))}
      </select>
      <span>Module</span>
      <select value={selectedModule} onChange={handleModuleChange}>
        {modules.map((module) => (
          <option key={module.contractAddress}>{module.moduleName}</option>
        ))}
      </select>
      <button disabled={isApproved || isPending} onClick={handleApprove}>
        {isApproved ? 'Approved' : isPending ? 'Loading' : 'Approve'}
      </button>
    </div>
  );
}

export function UseApproveModule() {
  const { data: currencies, loading: currenciesLoading } = useCurrencies();
  const { data: modules, loading: modulesLoading } = useEnabledModules();

  if (currenciesLoading || modulesLoading) return <Loading />;

  const allModules = [
    ...modules.collectModules,
    ...modules.followModules,
    ...modules.referenceModules,
  ];

  return (
    <div>
      <h1>
        <code>useApproveModule</code>
      </h1>
      <UseApproveModuleForm currencies={currencies} modules={allModules} />
    </div>
  );
}
