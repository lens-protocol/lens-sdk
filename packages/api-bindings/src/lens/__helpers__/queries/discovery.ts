import { MockedResponse } from '@apollo/client/testing';

import {
  FeedVariables,
  FeedItem,
  FeedDocument,
  FeedHighlightsVariables,
  FeedHighlight,
  FeedHighlightsData,
  FeedHighlightsDocument,
} from '../../graphql/generated';
import { mockAnyPaginatedResponse } from './mockAnyPaginatedResponse';

export function mockFeedResponse(args: { variables: FeedVariables; items: FeedItem[] }) {
  return mockAnyPaginatedResponse({
    variables: args.variables,
    items: args.items,
    query: FeedDocument,
  });
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
