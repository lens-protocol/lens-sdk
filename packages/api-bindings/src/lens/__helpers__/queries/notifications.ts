import { MockedResponse } from '@apollo/client/testing';

import {
  NotificationsVariables,
  Notification,
  NotificationsData,
  NotificationsDocument,
} from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';

export function mockNotificationsResponse(args: {
  variables: NotificationsVariables;
  items: Notification[];
}): MockedResponse<NotificationsData> {
  return {
    request: {
      query: NotificationsDocument,
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
        ...args.variables,
      },
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: mockPaginatedResultInfo(),
        },
      },
    },
  };
}
