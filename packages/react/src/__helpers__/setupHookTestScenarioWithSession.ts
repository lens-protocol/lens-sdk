import { MockedResponse } from '@apollo/client/testing';
import { Profile, updateSessionData } from '@lens-protocol/api-bindings';
import { mockProfileFragment, mockProfileResponse } from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { SessionType, useSession } from '../authentication';
import { setupHookTestScenario } from './setupHookTestScenario';

export async function setupHookTestScenarioWithSession(
  mocks: MockedResponse[],
  sessionProfile: Profile = mockProfileFragment(),
) {
  const session = {
    type: SessionType.WithProfile,
    address: sessionProfile.ownedBy.address,
    profileId: sessionProfile.id,
  };

  updateSessionData(session);

  const setupResult = setupHookTestScenario([
    mockProfileResponse({
      variables: {
        request: { forProfileId: sessionProfile.id },
      },
      result: sessionProfile,
    }),

    ...mocks,
  ]);

  const { result: sessionResult } = setupResult.renderHook(() => useSession());
  await waitFor(() => expect(sessionResult.current.loading).toBeFalsy());

  return setupResult;
}
