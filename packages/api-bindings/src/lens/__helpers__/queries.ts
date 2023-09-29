import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { AppId } from '@lens-protocol/domain/entities';

import { Cursor } from '../Cursor';
import {
  PublicationData,
  PublicationDocument,
  PublicationsData,
  PublicationsDocument,
  PublicationsVariables,
  PublicationVariables,
  PaginatedResultInfo,
} from '../graphql/generated';
import { AnyPublication, Sources } from '../utils';
import { mockPaginatedResultInfo, mockPostFragment } from './fragments';

export function mockSources(): Sources {
  return ['foobar' as AppId];
}

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
