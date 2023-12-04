import { MockedResponse } from '@apollo/client/testing';

import {
  RevokeAuthenticationData,
  RevokeAuthenticationDocument,
  RevokeAuthenticationVariables,
} from '../../graphql/generated';

export function mockRevokeAuthenticationResponse(
  variables: RevokeAuthenticationVariables,
): MockedResponse<RevokeAuthenticationData> {
  return {
    request: {
      query: RevokeAuthenticationDocument,
      variables,
    },
    result: { data: { revokeAuthentication: null } },
  };
}
