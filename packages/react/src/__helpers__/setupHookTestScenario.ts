import { MockedResponse } from '@apollo/client/testing';
import { ProfileFragmentVariables } from '@lens-protocol/api-bindings';
import { mockLensApolloClient } from '@lens-protocol/api-bindings/mocks';
import { IStorageProvider } from '@lens-protocol/storage';
import { RenderHookResult } from '@testing-library/react';
import { mock } from 'jest-mock-extended';

import { IBindings, resolveConfig } from '../config';
import { development } from '../environments';
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
          config: resolveConfig({
            bindings: mock<IBindings>(),
            environment: development,
            storage: mock<IStorageProvider>(),
          }),
          apolloClient: client,
          publicationCacheManager: new PublicationCacheManager(client),
          profileCacheManager: new ProfileCacheManager(client, mock<ProfileFragmentVariables>()),
        },
      });
    },
  };
}
