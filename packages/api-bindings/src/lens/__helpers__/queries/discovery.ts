import { FeedVariables, FeedItem, FeedDocument } from '../../graphql/generated';
import { mockAnyPaginatedResponse } from './mockAnyPaginatedResponse';

export function mockFeedResponse(args: { variables: FeedVariables; items: FeedItem[] }) {
  return mockAnyPaginatedResponse({
    variables: args.variables,
    items: args.items,
    query: FeedDocument,
  });
}
