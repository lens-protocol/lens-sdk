import { AppId } from '@lens-protocol/domain/entities';

export const DEFAULT_PAGINATED_QUERY_LIMIT = 10;

export function appId(value: string): AppId {
  // for now just asserts the type, in future it will enforce a format
  return value as AppId;
}
