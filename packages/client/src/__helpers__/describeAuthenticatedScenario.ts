import { never } from '@lens-protocol/shared-kernel';

import { setupAuthenticatedScenario, SetupOptions, TestSetup } from './setupAuthenticatedScenario';

function buildDescribeName(options?: SetupOptions): string {
  if (!options) {
    return 'and the instance is authenticated with a random wallet';
  }
  if (options.withNewProfile && options.withDispatcher) {
    return 'and the instance is authenticated with a random wallet with a profile and dispatcher';
  }
  if (options.withNewProfile) {
    return 'and the instance is authenticated with a random wallet with a profile';
  }

  never('withDispatcher cannot be used without withNewProfile');
}

type GetTestSetupFn = () => TestSetup;

export const describeAuthenticatedScenario =
  (options?: SetupOptions) => (callback: (f: GetTestSetupFn) => void) => {
    const getTestSetup = setupAuthenticatedScenario(options);

    describe(buildDescribeName(options), () => callback(getTestSetup));
  };
