import {
  mockLensApolloClient,
  mockRevokeAuthenticationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockStorage } from '@lens-protocol/storage/mocks';

import { LogoutReason } from '../../useSession';
import { CredentialsGateway } from '../CredentialsGateway';
import { JwtCredentials } from '../JwtCredentials';
import { mockJwtCredentials } from '../__helpers__/mocks';

const credentials = mockJwtCredentials();

const setupGateway = () => {
  const storage = mockStorage<JwtCredentials>();
  const authorizationId = credentials.authorizationId;
  const apolloClient = mockLensApolloClient([
    mockRevokeAuthenticationResponse({
      request: {
        authorizationId,
      },
    }),
  ]);
  return new CredentialsGateway(storage, apolloClient);
};

describe(`Given an instance of the ${CredentialsGateway.name}`, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe(`when "${CredentialsGateway.prototype.save.name}" method is invoked`, () => {
    it('should store the credentials in the underlying storage so they can be retrieve later on', async () => {
      const gateway = setupGateway();

      await gateway.save(credentials);

      const result = await gateway.getCredentials();
      expect(result).toEqual(credentials);
    });
  });

  describe(`when "${CredentialsGateway.prototype.invalidate.name}" method is invoked`, () => {
    it(`should clear the credentials in the underlying storage`, async () => {
      const gateway = setupGateway();

      await gateway.save(credentials);
      await gateway.invalidate(LogoutReason.USER_INITIATED);

      const result = await gateway.getCredentials();
      expect(result).toBe(null);
    });
  });
});
