import type { FragmentOf } from 'gql.tada';
import { PaginatedResultInfoFragment } from './fragments';
import { type RequestOf, dynamic, partial } from './graphql';

const timelineItemFragment = partial(
  `fragment TimelineItem on TimelineItem {
    __typename
    id
    primary {
      ${'...Post'}
    }
    comments {
      ${'...Post'}
    }
    reposts {
      ${'...Post'}
    }
  }`,
  [],
);
export type TimelineItem = FragmentOf<typeof timelineItemFragment>;

export const timelineQuery = dynamic(
  `query Timeline($request: TimelineRequest!) {
    value: timeline(request: $request) {
      __typename
      items {
        ${'...TimelineItem'}
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [timelineItemFragment, PaginatedResultInfoFragment],
);
export type TimelineRequest = RequestOf<typeof timelineQuery>;

export const timelineHighlightsQuery = dynamic(
  `query TimelineHighlights($request: TimelineHighlightsRequest!) {
    value: timelineHighlights(request: $request) {
      __typename
      items {
        ${'...Post'}
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [PaginatedResultInfoFragment],
);
export type TimelineHighlightsRequest = RequestOf<typeof timelineHighlightsQuery>;
