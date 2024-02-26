import {
  PaginatedResultInfo,
  PublicationBookmarksDocument,
  PublicationBookmarksVariables,
  PublicationDocument,
  PublicationVariables,
  PublicationsDocument,
  PublicationsVariables,
  SearchPublicationsDocument,
  SearchPublicationsVariables,
} from '../../graphql/generated';
import { AnyPublication, PrimaryPublication } from '../../publication';
import { mockPaginatedResultInfo } from '../fragments';
import { mockAnyPaginatedResponse, mockAnyResponse } from './helpers';

export function mockPublicationResponse({
  variables,
  result,
}: {
  variables: Pick<PublicationVariables, 'request'>;
  result: AnyPublication | null;
}) {
  return mockAnyResponse({
    request: {
      query: PublicationDocument,
      variables,
    },
    result: {
      data: { result },
    },
  });
}

export function mockPublicationsResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: Pick<PublicationsVariables, 'cursor' | 'limit' | 'where'>;
  items: Array<AnyPublication>;
  info?: PaginatedResultInfo;
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    info,
    query: PublicationsDocument,
  });
}

export function mockSearchPublicationsResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: Pick<SearchPublicationsVariables, 'cursor' | 'limit' | 'query' | 'where'>;
  items: Array<PrimaryPublication>;
  info?: PaginatedResultInfo;
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    info,
    query: SearchPublicationsDocument,
  });
}

export function mockProfileBookmarksResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: Pick<PublicationBookmarksVariables, 'request'>;
  items: AnyPublication[];
  info?: PaginatedResultInfo;
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    info,
    query: PublicationBookmarksDocument,
  });
}
