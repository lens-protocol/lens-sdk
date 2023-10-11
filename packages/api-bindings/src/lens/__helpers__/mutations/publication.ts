import { MockedResponse } from '@apollo/client/testing';

import {
  AddReactionDocument,
  AddReactionVariables,
  ReportPublicationVariables,
  ReportPublicationData,
  ReportPublicationDocument,
} from '../../graphql/generated';

export function mockReportPublicationResponse(args: {
  variables: ReportPublicationVariables;
}): MockedResponse<ReportPublicationData> {
  return {
    request: {
      query: ReportPublicationDocument,
      variables: args.variables,
    },
    result: { data: { reportPublication: null } },
  };
}

export function mockAddReactionResponse({ variables }: { variables: AddReactionVariables }) {
  return {
    request: {
      query: AddReactionDocument,
      variables,
    },
    result: {
      data: { addReaction: null },
    },
  };
}
