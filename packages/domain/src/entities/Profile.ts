export type ProfileId = string;

export class Profile {
  private constructor(readonly id: ProfileId, readonly handle: string, readonly address: string) {}

  static create({
    id,
    handle,
    address,
  }: {
    id: ProfileId;
    handle: string;
    address: string;
  }): Profile {
    return new Profile(id, handle, address);
  }
}
