import {
  ExploreProfilesDocument,
  ExploreProfilesVariables,
  FeedDocument,
  FeedHighlight,
  FeedHighlightsDocument,
  FeedHighlightsVariables,
  FeedItem,
  FeedVariables,
  Profile,
} from '../../graphql/generated';
import { mockAnyPaginatedResponse } from './mockAnyPaginatedResponse';

export function mockFeedResponse({
  variables,
  items,
}: {
  variables: FeedVariables;
  items: FeedItem[];
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    query: FeedDocument,
  });
}

export function mockFeedHighlightsResponse({
  variables,
  items,
}: {
  variables: FeedHighlightsVariables;
  items: FeedHighlight[];
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    query: FeedHighlightsDocument,
  });
}

export function mockExploreProfilesResponse({
  variables,
  items,
}: {
  variables: ExploreProfilesVariables;
  items: Profile[];
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    query: ExploreProfilesDocument,
  });
}
