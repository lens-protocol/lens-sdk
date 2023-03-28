import { Brand } from '@lens-protocol/shared-kernel';

export type ProfileId = Brand<string, 'ProfileId'>;

export class Profile {
  private constructor(readonly id: ProfileId, readonly handle: string) {}

  static create({ id, handle }: { id: ProfileId; handle: string }): Profile {
    return new Profile(id, handle);
  }
}
