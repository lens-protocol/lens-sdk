import { renderHook, RenderHookOptions } from '@testing-library/react';
import { ReactNode, Suspense } from 'react';

import { SharedDependencies, SharedDependenciesProvider } from '../shared';

type RenderHookWithMocksOptions<TProps> = Omit<RenderHookOptions<TProps>, 'wrapper'> & {
  mocks: Partial<SharedDependencies>;
};

function createWrapper(mocks: Partial<SharedDependencies> = {}) {
  return function TestWrapper({ children }: { children: ReactNode }) {
    return (
      <SharedDependenciesProvider dependencies={mocks as SharedDependencies}>
        <Suspense>{children}</Suspense>
      </SharedDependenciesProvider>
    );
  };
}

export function renderHookWithMocks<TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookWithMocksOptions<TProps>,
) {
  return renderHook(callback, {
    wrapper: createWrapper(options?.mocks),
    ...options,
  });
}
