import { MockedResponse } from '@apollo/client/testing';

import {
  HidePublicationVariables,
  HidePublicationData,
  HidePublicationDocument,
} from '../../graphql/generated';

export function mockHidePublicationResponse(args: {
  variables: HidePublicationVariables;
}): MockedResponse<HidePublicationData> {
  return {
    request: {
      query: HidePublicationDocument,
      variables: args.variables,
    },
    result: {
      data: { hidePublication: null },
    },
  };
}
