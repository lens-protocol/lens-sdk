import { GraphQLClient } from 'graphql-request';

import { staging } from '../consts/environments';
import { Profile } from './profile';

describe(`Given the ${Profile.name} configured to work with staging environment`, () => {
  const client = new GraphQLClient(staging.backend);
  const profile = new Profile(client);

  describe(`when a method ${Profile.prototype.getProfileByHandle.name} is called`, () => {
    it(`returns the requested profile`, async () => {
      const result = await profile.getProfileByHandle('kristestnet.test');

      expect(result).toMatchObject({
        id: '0x53a8',
        handle: 'kristestnet.test',
      });
    });
  });
});
