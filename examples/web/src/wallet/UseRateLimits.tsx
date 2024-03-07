import { EvmAddress, UserCurrentRateLimit, useRateLimits } from '@lens-protocol/react-web';

import { RequireConnectedWallet } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

function RateLimits({ limits }: { limits: UserCurrentRateLimit }) {
  return (
    <>
      <div>{`You used ${limits.hourAllowanceUsed} from total hourly sponsored tx allowance of ${limits.hourAllowance}. You have ${limits.hourAllowanceLeft} left.`}</div>
      <div>{`You used ${limits.dayAllowanceUsed} from total daily sponsored tx allowance of ${limits.dayAllowance}. You have ${limits.dayAllowanceLeft} left.`}</div>
    </>
  );
}

function UseRateLimitsInner({ address }: { address: EvmAddress }) {
  const { data, error, loading } = useRateLimits({ userAddress: address });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h4>Onchain Limits</h4>
      <RateLimits limits={data.onchain} />
      <h4>Momoka Limits</h4>
      <RateLimits limits={data.momoka} />
    </div>
  );
}

export function UseRateLimits() {
  return (
    <div>
      <h1>
        <code>useRateLimits</code>
      </h1>

      <RequireConnectedWallet message="Connect wallet to view this example.">
        {(address) => <UseRateLimitsInner address={address} />}
      </RequireConnectedWallet>
    </div>
  );
}
