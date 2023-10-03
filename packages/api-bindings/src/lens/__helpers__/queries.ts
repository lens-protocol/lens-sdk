import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';

import { Cursor } from '../Cursor';
import {
  PaginatedResultInfo,
  PublicationData,
  PublicationDocument,
  PublicationVariables,
  PublicationsData,
  PublicationsDocument,
  PublicationsVariables,
} from '../graphql/generated';
import { AnyPublication } from '../utils';
import { mockPaginatedResultInfo, mockPostFragment } from './fragments';

export function mockCursor(): Cursor {
  return faker.random.alphaNumeric(10) as Cursor;
}

export function mockPublicationsResponse({
  variables,
  publications,
  info = mockPaginatedResultInfo(),
}: {
  variables: PublicationsVariables;
  publications: Array<AnyPublication>;
  info?: PaginatedResultInfo;
}): MockedResponse<PublicationsData> {
  return {
    request: {
      query: PublicationsDocument,
      variables: variables,
    },
    result: {
      data: {
        result: {
          items: publications,
          pageInfo: info,
        },
      },
    },
  };
}

function mockPublicationData(
  publication: AnyPublication | null = mockPostFragment(),
): PublicationData {
  return {
    result: publication,
  };
}

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
      data: mockPublicationData(publication),
    },
  };
}

export function mockGetPublicationsResponse({
  variables,
  publications,
  info = mockPaginatedResultInfo(),
}: {
  variables: PublicationsVariables;
  publications: Array<AnyPublication>;
  info?: PaginatedResultInfo;
}): MockedResponse<PublicationsData> {
  return {
    request: {
      query: PublicationsDocument,
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
          items: publications,
          pageInfo: info,
        },
      },
    },
  };
}
