import {
  Notification,
  NotificationsDocument,
  NotificationsVariables,
  PaginatedResultInfo,
} from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';
import { mockAnyPaginatedResponse } from './helpers';

export function mockNotificationsResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: Pick<NotificationsVariables, 'statsFor' | 'where'>;
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
