import {
  PaginatedResultInfo,
  PublicationDocument,
  PublicationVariables,
  PublicationsDocument,
  PublicationsVariables,
  SearchPublicationsDocument,
  SearchPublicationsVariables,
} from '../../graphql/generated';
import { AnyPublication, PrimaryPublication } from '../../publication';
import { mockPaginatedResultInfo } from '../fragments';
import { mockAnyPaginatedResponse, mockAnyResponse } from './mockAnyPaginatedResponse';

export function mockPublicationResponse({
  variables,
  result,
}: {
  variables: PublicationVariables;
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
  variables: PublicationsVariables;
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
  variables: SearchPublicationsVariables;
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
