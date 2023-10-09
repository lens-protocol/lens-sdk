import {
  FeedDocument,
  FeedHighlight,
  FeedHighlightsDocument,
  FeedHighlightsVariables,
  FeedItem,
  FeedVariables,
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
