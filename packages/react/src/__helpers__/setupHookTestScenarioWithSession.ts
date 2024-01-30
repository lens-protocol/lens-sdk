import { MockedResponse } from '@apollo/client/testing';
import { Profile, updateSessionData } from '@lens-protocol/api-bindings';
import { mockProfileFragment, mockProfileResponse } from '@lens-protocol/api-bindings/mocks';
import { ProfileSessionData } from '@lens-protocol/domain/use-cases/authentication';

import { SessionType } from '../authentication';
import { setupHookTestScenario } from './setupHookTestScenario';

export function setupHookTestScenarioWithSession(
  mocks: MockedResponse[],
  sessionProfile: Profile = mockProfileFragment(),
) {
  const session: ProfileSessionData = {
    type: SessionType.WithProfile,
    address: sessionProfile.ownedBy.address,
    profileId: sessionProfile.id,
  };

  updateSessionData(session);

  return setupHookTestScenario([
    mockProfileResponse({
      variables: {
        request: { forProfileId: sessionProfile.id },
      },
      result: sessionProfile,
    }),

    ...mocks,
  ]);
}
