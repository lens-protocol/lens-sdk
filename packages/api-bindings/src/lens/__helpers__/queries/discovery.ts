import { MockedResponse } from '@apollo/client/testing';

import { FeedVariables, FeedItem, FeedData, FeedDocument } from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';

export function mockFeedResponse(args: {
  variables: FeedVariables;
  items: FeedItem[];
}): MockedResponse<FeedData> {
  return {
    request: {
      query: FeedDocument,
      variables: {
        publicationImageTransform: {},
        publicationOperationsActedArgs: {},
        publicationStatsInput: {},
        publicationStatsCountOpenActionArgs: {},
        profileCoverTransform: {},
        profilePictureTransform: {},
        profileStatsArg: {},
        profileStatsCountOpenActionArgs: {},
        rateRequest: { for: 'USD' },
        ...args.variables,
      },
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: mockPaginatedResultInfo(),
        },
      },
    },
  };
}
