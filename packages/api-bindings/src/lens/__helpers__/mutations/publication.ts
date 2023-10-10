import { MockedResponse } from '@apollo/client/testing';

import {
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
