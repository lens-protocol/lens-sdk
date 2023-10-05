import { Profile } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockProfileFragment,
  mockSearchProfilesResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../../utils';
import { UseSearchProfilesArgs, useSearchProfiles } from '../useSearchProfiles';

function setupTestScenario({
  result,
  query,
  where,
  limit,
}: UseSearchProfilesArgs & { result: Profile[] }) {
  return renderHookWithMocks(() => useSearchProfiles({ query, where, limit }), {
    mocks: {
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockSearchProfilesResponse({
          variables: {
            query,
            where,
            limit: limit ?? DEFAULT_PAGINATED_QUERY_LIMIT,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          items: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useSearchProfiles.name} hook`, () => {
  const query = 'query_test';
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ id }) => ({ __typename: 'Profile', id }));

  describe('when the query returns data successfully', () => {
    it('should return profiles that match the search criteria', async () => {
      const { result } = setupTestScenario({ query, result: profiles });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
