import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';
import { z } from 'zod';

export const UnreadNotificationsData = z.object({
  totalReadNotificationsCount: z.number().nullable(),
});

export type UnreadNotificationsData = z.infer<typeof UnreadNotificationsData>;

const notificationStorageDataSchema = new BaseStorageSchema(
  'lens.notifications',
  UnreadNotificationsData,
);

export function createNotificationStorage(storageProvider: IStorageProvider) {
  return Storage.createForSchema(notificationStorageDataSchema, storageProvider);
}
