import {
  FeedVariables,
  FeedItem,
  FeedDocument,
  FeedHighlight,
  FeedHighlightsDocument,
  FeedHighlightsVariables,
  ExplorePublicationsDocument,
  ExplorePublicationsVariables,
  ExplorePublication,
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

export function mockExplorePublicationsResponse(args: {
  variables: ExplorePublicationsVariables;
  items: ExplorePublication[];
}) {
  return mockAnyPaginatedResponse({
    variables: args.variables,
    items: args.items,
    query: ExplorePublicationsDocument,
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
