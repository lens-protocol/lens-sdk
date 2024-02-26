import {
  FollowRevenuesDocument,
  FollowRevenuesVariables,
  PaginatedResultInfo,
  PublicationRevenue,
  RevenueAggregate,
  RevenueFromPublicationDocument,
  RevenueFromPublicationVariables,
  RevenueFromPublicationsDocument,
  RevenueFromPublicationsVariables,
} from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';
import { mockAnyPaginatedResponse, mockAnyResponse } from './helpers';

export function mockFollowRevenuesResponse({
  variables,
  result,
}: {
  variables: Pick<FollowRevenuesVariables, 'request'>;
  result: RevenueAggregate[];
}) {
  return mockAnyResponse({
    request: {
      query: FollowRevenuesDocument,
      variables,
    },
    result: {
      data: { result: { revenues: result } },
    },
  });
}

export function mockRevenueFromPublicationResponse({
  variables,
  result,
}: {
  variables: Pick<RevenueFromPublicationVariables, 'request'>;
  result: PublicationRevenue | null;
}) {
  return mockAnyResponse({
    request: {
      query: RevenueFromPublicationDocument,
      variables,
    },
    result: {
      data: { result },
    },
  });
}

export function mockRevenueFromPublicationsResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: Pick<RevenueFromPublicationsVariables, 'cursor' | 'for' | 'limit' | 'publishedOn'>;
  items: Array<PublicationRevenue>;
  info?: PaginatedResultInfo;
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    info,
    query: RevenueFromPublicationsDocument,
  });
}
