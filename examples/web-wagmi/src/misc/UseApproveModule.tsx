import {
  Amount,
  EnabledModuleFragment,
  Erc20,
  TokenAllowanceLimit,
  useApproveModule,
  useCurrencies,
  useEnabledModules,
} from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { never } from '../utils';

type UseApproveModuleFormProps = {
  currencies: Erc20[];
  modules: EnabledModuleFragment[];
};

function UseApproveModuleForm({ currencies, modules }: UseApproveModuleFormProps) {
  const { execute: approve, error, isPending } = useApproveModule();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = (formData.get('value') as string | null) ?? never();
    const currencyAddress = (formData.get('currency') as string | null) ?? never();
    const spender = (formData.get('spender') as string | null) ?? never();

    const currency = currencies.find(({ address }) => address === currencyAddress) ?? never();

    await approve({
      amount: Amount.erc20(currency, value),
      spender,
      limit: TokenAllowanceLimit.EXACT,
    });
  };

  return (
    <form onSubmit={submit}>
      <label>
        Amount
        <br />
        <input name="value" type="number" min={0} defaultValue={0} disabled={isPending} />
      </label>

      <label>
        Currency
        <br />
        <select name="currency" disabled={isPending}>
          {currencies.map((currency) => (
            <option key={currency.address} value={currency.address}>
              {currency.symbol}
            </option>
          ))}
        </select>
      </label>

      <label>
        Module
        <br />
        <select name="spender" disabled={isPending}>
          {modules.map((module) => (
            <option key={module.contractAddress} value={module.contractAddress}>
              {module.moduleName}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Loading' : 'Approve'}
      </button>
      {error && <ErrorMessage error={error} />}
    </form>
  );
}

export function UseApproveModule() {
  const { data: currencies, error: currenciesError, loading: currenciesLoading } = useCurrencies();
  const { data: modules, error: modulesError, loading: modulesLoading } = useEnabledModules();

  if (currenciesLoading || modulesLoading) return <Loading />;

  if (currenciesError) return <ErrorMessage error={currenciesError} />;
  if (modulesError) return <ErrorMessage error={modulesError} />;

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
