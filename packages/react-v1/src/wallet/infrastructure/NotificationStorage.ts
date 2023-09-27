import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';
import { z } from 'zod';

export const UnreadNotificationsData = z.object({
  totalReadNotificationsCount: z.number().nullable(),
});

export type UnreadNotificationsData = z.infer<typeof UnreadNotificationsData>;

export function createNotificationStorage(storageProvider: IStorageProvider, namespace: string) {
  const notificationStorageDataSchema = new BaseStorageSchema(
    `lens.${namespace}.notifications`,
    UnreadNotificationsData,
  );
  return Storage.createForSchema(notificationStorageDataSchema, storageProvider);
}
