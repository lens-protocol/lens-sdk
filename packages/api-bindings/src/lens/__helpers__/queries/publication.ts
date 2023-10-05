import { MockedResponse } from '@apollo/client/testing';

import {
  PaginatedResultInfo,
  PublicationData,
  PublicationDocument,
  PublicationVariables,
  PublicationsData,
  PublicationsDocument,
  PublicationsVariables,
  SearchPublicationsData,
  SearchPublicationsDocument,
  SearchPublicationsVariables,
} from '../../graphql/generated';
import { AnyPublication, PrimaryPublication } from '../../utils';
import { mockPaginatedResultInfo } from '../fragments';

export function mockPublicationResponse({
  variables,
  publication,
}: {
  variables: PublicationVariables;
  publication: AnyPublication | null;
}): MockedResponse<PublicationData> {
  return {
    request: {
      query: PublicationDocument,
      variables,
    },
    result: {
      data: {
        result: publication,
      },
    },
  };
}

/**
 * All paginated publication responses have the same shape
 */
function mockAnyPaginatedPublicationResponse<V, I, Q>({
  variables,
  items,
  info = mockPaginatedResultInfo(),
  query,
}: {
  variables: V;
  items: I[];
  info?: PaginatedResultInfo;
  query: Q;
}) {
  return {
    request: {
      query,
      variables: {
        publicationImageTransform: {},
        publicationOperationsActedArgs: {},
        publicationStatsInput: {},
        publicationStatsCountOpenActionArgs: {},
        profileCoverTransform: {},
        profilePictureTransform: {},
        profileStatsArg: {},
        profileStatsCountOpenActionArgs: {},
        rateRequest: { for: 'USD' },
        ...variables,
      },
    },
    result: {
      data: {
        result: {
          items,
          pageInfo: info,
        },
      },
    },
  };
}

export function mockPublicationsResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: PublicationsVariables;
  items: Array<AnyPublication>;
  info?: PaginatedResultInfo;
}): MockedResponse<PublicationsData> {
  return mockAnyPaginatedPublicationResponse({
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
}): MockedResponse<SearchPublicationsData> {
  return mockAnyPaginatedPublicationResponse({
    variables,
    items,
    info,
    query: SearchPublicationsDocument,
  });
}
