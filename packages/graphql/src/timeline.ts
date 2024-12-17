import type { FragmentOf } from 'gql.tada';
import { PaginatedResultInfoFragment, PostFragment } from './fragments';
import { type RequestOf, graphql } from './graphql';

const TimelineItemFragment = graphql(
  `fragment TimelineItem on TimelineItem {
    __typename
    id
    primary {
      ...Post
    }
    comments {
      ...Post
    }
    reposts {
      ...Post
    }
  }`,
  [PostFragment],
);
export type TimelineItem = FragmentOf<typeof TimelineItemFragment>;

export const TimelineQuery = graphql(
  `query Timeline($request: TimelineRequest!) {
    value: timeline(request: $request) {
      __typename
      items {
        ...TimelineItem
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [TimelineItemFragment, PaginatedResultInfoFragment],
);
export type TimelineRequest = RequestOf<typeof TimelineQuery>;

export const TimelineHighlightsQuery = graphql(
  `query TimelineHighlights($request: TimelineHighlightsRequest!) {
    value: timelineHighlights(request: $request) {
      __typename
      items {
        ...Post
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [PostFragment, PaginatedResultInfoFragment],
);
export type TimelineHighlightsRequest = RequestOf<typeof TimelineHighlightsQuery>;
