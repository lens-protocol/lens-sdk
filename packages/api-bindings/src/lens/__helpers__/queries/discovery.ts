import {
  ExploreProfilesDocument,
  ExploreProfilesVariables,
  FeedVariables,
  FeedItem,
  FeedDocument,
  FeedHighlight,
  FeedHighlightsDocument,
  FeedHighlightsVariables,
  ExplorePublicationsDocument,
  ExplorePublicationsVariables,
  ExplorePublication,
  Profile,
} from '../../graphql/generated';
import { mockAnyPaginatedResponse } from './helpers';

export function mockFeedResponse({
  variables,
  items,
}: {
  variables: Pick<FeedVariables, 'where'>;
  items: FeedItem[];
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    query: FeedDocument,
  });
}

export function mockExplorePublicationsResponse(args: {
  variables: Pick<ExplorePublicationsVariables, 'limit' | 'orderBy' | 'where'>;
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
  variables: Pick<FeedHighlightsVariables, 'limit' | 'where'>;
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
  variables: Pick<ExploreProfilesVariables, 'limit' | 'orderBy' | 'where'>;
  items: Profile[];
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    query: ExploreProfilesDocument,
  });
}
