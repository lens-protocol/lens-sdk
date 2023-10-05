import { LimitType } from '@lens-protocol/api-bindings';
import {
  mockProfileFragment,
  mockWhoActedOnPublicationResponse,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { mockPublicationId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import {
  UseWhoActedOnPublicationArgs,
  useWhoActedOnPublication,
} from '../useWhoActedOnPublication';

describe(`Given the ${useWhoActedOnPublication.name} hook`, () => {
  const publicationId = mockPublicationId();
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const { renderHook } = setupHookTestScenario([
        mockWhoActedOnPublicationResponse({
          variables: {
            on: publicationId,
            limit: LimitType.Ten,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          items: profiles,
        }),
      ]);

      const args: UseWhoActedOnPublicationArgs = {
        on: publicationId,
      };

      const { result } = renderHook(() => useWhoActedOnPublication(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
