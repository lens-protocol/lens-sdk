import { LensClient } from '../LensClient';
import { staging } from '../consts/environments';
import { LensPublication } from './LensPublication';

describe(`Given the ${LensPublication.name} configured to work with staging environment`, () => {
  const client = new LensClient({
    environment: staging,
  });

  const publication = new LensPublication(client);

  describe(`when a method ${LensPublication.prototype.getPublicationById.name} is called`, () => {
    it(`returns the requested publication`, async () => {
      const result = await publication.getPublicationById('0x53a8-0x0f');

      expect(result).toMatchObject({
        __typename: 'Post',
        id: '0x53a8-0x0f',
      });
    });
  });
});
