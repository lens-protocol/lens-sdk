import {
  FeedVariables,
  FeedItem,
  FeedDocument,
  ExplorePublicationsDocument,
  ExplorePublicationsVariables,
  ExplorePublication,
} from '../../graphql/generated';
import { mockAnyPaginatedResponse } from './mockAnyPaginatedResponse';

export function mockFeedResponse(args: { variables: FeedVariables; items: FeedItem[] }) {
  return mockAnyPaginatedResponse({
    variables: args.variables,
    items: args.items,
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
