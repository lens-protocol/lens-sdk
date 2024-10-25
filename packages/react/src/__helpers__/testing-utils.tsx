import { type RenderHookOptions, renderHook } from '@testing-library/react';
import React, { type ReactNode, Suspense } from 'react';

import { type LensContextValue, LensContextProvider } from '../context';

function createWrapper(mocks: Partial<LensContextValue> = {}) {
  return function TestWrapper({ children }: { children: ReactNode }) {
    return (
      <LensContextProvider value={mocks as LensContextValue}>
        <Suspense>{children}</Suspense>
      </LensContextProvider>
    );
  };
}

export type RenderHookWithContextOptions<TProps> = Omit<RenderHookOptions<TProps>, 'wrapper'> & {
  mocks: Partial<LensContextValue>;
};

/**
 * Wrapper around `renderHook` from `@testing-library/react`.
 * 
 * Use it to run test on an hook that requires the Lens SDK context and/or a Suspense boundary.
 * 
 * ```ts
 * const { result } = renderHookWithContext(() => useMyHook());
 * ```
 * 
 * Use a mock object:
 * ```ts
 * const { result } = renderHookWithContext(() => useMyHook(), {
 *   mocks: {
 *     client: mock<Client>(),
 *   },
 * });
 * ```
 */
export function renderHookWithContext<TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookWithContextOptions<TProps>,
) {
  return renderHook(callback, {
    wrapper: createWrapper(options?.mocks),
    ...options,
  });
}
