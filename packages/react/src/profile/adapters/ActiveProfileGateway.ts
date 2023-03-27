import { Profile, ProfileId } from '@lens-protocol/domain/entities';
import * as profileUseCases from '@lens-protocol/domain/use-cases/profile';
import * as walletsUseCases from '@lens-protocol/domain/use-cases/wallets';
import { IStorage } from '@lens-protocol/storage';
import { z } from 'zod';

export const StoredActiveProfileData = z.object({
  id: z.custom<ProfileId>(),
  handle: z.string(),
});

export type StoredActiveProfileData = z.infer<typeof StoredActiveProfileData>;

export class ActiveProfileGateway
  implements profileUseCases.IActiveProfileGateway, walletsUseCases.IActiveProfileGateway
{
  constructor(private readonly activeProfileStorage: IStorage<StoredActiveProfileData>) {}

  async setActiveProfile(profile: Profile): Promise<void> {
    await this.activeProfileStorage.set(profile);
  }

  async getActiveProfile(): Promise<Profile | null> {
    const data = await this.activeProfileStorage.get();

    if (!data) {
      return null;
    }
    return data;
  }

  async reset() {
    await this.activeProfileStorage.reset();
  }
}
