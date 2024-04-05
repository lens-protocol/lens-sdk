import { MockedResponse } from '@apollo/client/testing';
import { Profile, updateSessionData } from '@lens-protocol/api-bindings';
import { mockProfileFragment, mockProfileResponse } from '@lens-protocol/api-bindings/mocks';
import { ProfileSessionData } from '@lens-protocol/domain/use-cases/authentication';
import { waitFor } from '@testing-library/react';

import { SessionType, useSession } from '../authentication';
import { setupHookTestScenario } from './setupHookTestScenario';

export async function setupHookTestScenarioWithSession(
  mocks: MockedResponse[],
  sessionProfile: Profile = mockProfileFragment(),
) {
  const session: ProfileSessionData = {
    type: SessionType.WithProfile,
    address: sessionProfile.ownedBy.address,
    profileId: sessionProfile.id,
  };

  const scenario = setupHookTestScenario([
    mockProfileResponse({
      variables: {
        request: { forProfileId: sessionProfile.id },
      },
      result: sessionProfile,
    }),

    ...mocks,
  ]);

  updateSessionData(session);

  const { result } = scenario.renderHook(useSession);

  await waitFor(() => expect(result.current.loading).toBeFalsy());

  return scenario;
}
