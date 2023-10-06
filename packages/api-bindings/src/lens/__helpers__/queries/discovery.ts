import { MockedResponse } from '@apollo/client/testing';

import {
  FeedVariables,
  FeedItem,
  FeedData,
  FeedDocument,
  FeedHighlightsVariables,
  FeedHighlight,
  FeedHighlightsData,
  FeedHighlightsDocument,
} from '../../graphql/generated';
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

export function mockFeedHighlightsResponse(args: {
  variables: FeedHighlightsVariables;
  items: FeedHighlight[];
}): MockedResponse<FeedHighlightsData> {
  return {
    request: {
      query: FeedHighlightsDocument,
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
