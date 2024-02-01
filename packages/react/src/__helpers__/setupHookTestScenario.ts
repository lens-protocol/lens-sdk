import { MockedResponse } from '@apollo/client/testing';
import { mockLensApolloClient } from '@lens-protocol/api-bindings/mocks';
import { RenderHookResult } from '@testing-library/react';

import { ProfileCacheManager } from '../profile/infrastructure/ProfileCacheManager';
import { PublicationCacheManager } from '../publication/infrastructure/PublicationCacheManager';
import { renderHookWithMocks } from './testing-library';

export function setupHookTestScenario(mocks: MockedResponse[]) {
  const client = mockLensApolloClient(mocks);

  return {
    renderHook: <TProps, TResult>(
      callback: (props: TProps) => TResult,
    ): RenderHookResult<TResult, TProps> => {
      return renderHookWithMocks(callback, {
        mocks: {
          apolloClient: client,
          publicationCacheManager: new PublicationCacheManager(client),
          profileCacheManager: new ProfileCacheManager(client),
        },
      });
    },
  };
}
