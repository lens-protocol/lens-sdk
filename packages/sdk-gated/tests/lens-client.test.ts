import { LensEnvironment } from '../src';
import LensAPIClient from '../src/lens/client';

describe('lens client', () => {
  const lensClient = new LensAPIClient(LensEnvironment.Mumbai);

  it('should get the last publication id for a profile id', async () => {
    const actual = await lensClient.getLastPublicationIdForProfileId('0x01');
    expect(actual).toBe('0x01-0x01');
  });
  it('should return null if profile has not made any publications', async () => {
    const actual = await lensClient.getLastPublicationIdForProfileId('0xffffffffffffffff');
    expect(actual).toBeNull();
  });
});
