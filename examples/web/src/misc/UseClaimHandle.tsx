import { useCanClaimHandle } from '@lens-protocol/react-web';

import { UnauthenticatedFallback, WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

export function UseCanClaimHandle() {
  const { data, error, loading } = useCanClaimHandle();

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  console.log(data);

  return <div>TODO</div>;
}

function UseClaimHandleInner() {
  return (
    <div>
      <UseCanClaimHandle />
    </div>
  );
}

export function UseClaimHandle() {
  return (
    <div>
      <h1>
        <code>useClaimHandle</code>
      </h1>
      <WhenLoggedIn>
        <UseClaimHandleInner />
      </WhenLoggedIn>
      <WhenLoggedOut>
        <UnauthenticatedFallback />
      </WhenLoggedOut>
    </div>
  );
}
