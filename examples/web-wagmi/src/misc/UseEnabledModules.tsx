import { useEnabledModules } from '@lens-protocol/react-web';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ModuleCard } from './components/ModuleCard';

function UseEnabledModulesInner() {
  const { data: enabledModules, error, loading } = useEnabledModules();

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <h2>
        <code>Collect modules</code>
      </h2>
      {enabledModules.collectModules.map((module) => (
        <ModuleCard key={module.contractAddress} module={module} />
      ))}
      <h2>
        <code>Follow modules</code>
      </h2>
      {enabledModules.followModules.map((module) => (
        <ModuleCard key={module.contractAddress} module={module} />
      ))}
      <h2>
        <code>Reference modules</code>
      </h2>
      {enabledModules.referenceModules.map((module) => (
        <ModuleCard key={module.contractAddress} module={module} />
      ))}
    </>
  );
}

export function UseEnabledModules() {
  return (
    <div>
      <h1>
        <code>useEnabledModules</code>
      </h1>
      <WhenLoggedInWithProfile>{() => <UseEnabledModulesInner />}</WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
