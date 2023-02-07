import { LensEnvironment } from '../../types';

const mock = jest.fn().mockImplementation((env: LensEnvironment) => {
  return {
    env,
    getLastPublicationIdForProfileId: (creatorProfileId: string) =>
      Promise.resolve(`${creatorProfileId}-0x01`),
    validateMetadata: () => Promise.resolve(true),
    validateAddressOwnsProfile: () => Promise.resolve(true),
    getProfilesForAddress: () => Promise.resolve([{ id: '0x01' }]),
  };
});

export default mock;
