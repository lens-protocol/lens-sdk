import { useEnabledModules } from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { ModuleCard } from './components/ModuleCard';

function UseEnabledModulesInner() {
  const { data: enabledModules, loading } = useEnabledModules();
  if (loading) return <Loading />;

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
