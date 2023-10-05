import { MockedResponse } from '@apollo/client/testing';
import { mockLensApolloClient } from '@lens-protocol/api-bindings/mocks';
import { RenderHookResult } from '@testing-library/react';

import { defaultMediaTransformsConfig } from '../mediaTransforms';
import { renderHookWithMocks } from './testing-library';

export function setupHookTestScenario(mocks: MockedResponse[]) {
  const client = mockLensApolloClient(mocks);

  return {
    renderHook<TProps, TResult>(
      callback: (props: TProps) => TResult,
    ): RenderHookResult<TResult, TProps> {
      return renderHookWithMocks(callback, {
        mocks: {
          mediaTransforms: defaultMediaTransformsConfig,
          apolloClient: client,
        },
      });
    },
  };
}
