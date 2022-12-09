export type ProfileData = {
  id: string;
  handle: string;
};

export interface IActiveProfilePresenter {
  presentActiveProfile(profile: ProfileData | null): Promise<void>;
}
