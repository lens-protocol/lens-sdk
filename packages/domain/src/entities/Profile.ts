export type ProfileId = `0x${string}`;

export class Profile {
  private constructor(readonly id: ProfileId, readonly handle: string) {}

  static create({ id, handle }: { id: ProfileId; handle: string }): Profile {
    return new Profile(id, handle);
  }
}
