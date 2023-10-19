import { EvmAddress, useOwnedHandles } from '@lens-protocol/react-web';

import { UnauthenticatedFallback, WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

function UseOwnedHandlesInner({ address }: { address: EvmAddress }) {
  const {
    data: handleResult,
    loading,
    error,
  } = useOwnedHandles({
    for: address,
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <ul>
        {handleResult.map((handle, index) => (
          <li key={index}>{handle.handle}</li>
        ))}
      </ul>
    </div>
  );
}

export function UseOwnedHandles() {
  return (
    <div>
      <h1>
        <code>useOwnedHandles & useLinkHandle & useUnlinkHandle</code>
      </h1>

      <WhenLoggedIn>{({ address }) => <UseOwnedHandlesInner address={address} />}</WhenLoggedIn>

      <WhenLoggedOut>
        <UnauthenticatedFallback />
      </WhenLoggedOut>
    </div>
  );
}
