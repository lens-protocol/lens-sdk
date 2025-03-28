import type { UUID } from '@lens-protocol/types';
import type { Prettify } from '@lens-protocol/types';
import {
  PaginatedResultInfoFragment,
  type Post,
  PostFragment,
  type Repost,
  RepostFragment,
} from './fragments';
import { type FragmentDocumentFor, type RequestOf, graphql } from './graphql';

export type TimelineItem = Prettify<{
  __typename: 'TimelineItem';
  id: UUID;
  primary: Post;
  comments: Post[];
  reposts: Repost[];
}>;

// mitigates error TS7056: The inferred type of this node exceeds the maximum length
// the compiler will serialize. An explicit type annotation is needed.
const TimelineItemFragment: FragmentDocumentFor<TimelineItem> = graphql(
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
      ...Repost
    }
  }`,
  [PostFragment, RepostFragment],
);

export const TimelineQuery = graphql(
  `query Timeline($request: TimelineRequest!) {
    value: timeline(request: $request) {
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
