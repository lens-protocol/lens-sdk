import type { FragmentOf } from 'gql.tada';
import { PaginatedResultInfo, Post } from './fragments';
import { type RequestOf, graphql } from './graphql';

const TimelineItem = graphql(
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
  [Post],
);
export type TimelineItem = FragmentOf<typeof TimelineItem>;

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
  [TimelineItem, PaginatedResultInfo],
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
  [Post, PaginatedResultInfo],
);
export type TimelineHighlightsRequest = RequestOf<typeof TimelineHighlightsQuery>;
