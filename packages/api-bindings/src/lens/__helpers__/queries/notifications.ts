import {
  Notification,
  NotificationsDocument,
  NotificationsVariables,
  PaginatedResultInfo,
} from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';
import { mockAnyPaginatedResponse } from './mockAnyPaginatedResponse';

export function mockNotificationsResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: NotificationsVariables;
  items: Notification[];
  info?: PaginatedResultInfo;
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    query: NotificationsDocument,
    info,
  });
}
