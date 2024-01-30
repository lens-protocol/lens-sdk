import {
  mockLensApolloClient,
  mockHidePublicationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockHidePublicationRequest, mockPublicationId } from '@lens-protocol/domain/mocks';

import { HidePublicationGateway } from '../HidePublicationGateway';

describe(`Given an instance of the ${HidePublicationGateway.name}`, () => {
  describe(`when the ${HidePublicationGateway.prototype.hide.name} method is invoked`, () => {
    it(`should perform the expected mutation request`, async () => {
      const publicationId = mockPublicationId();

      const apolloClient = mockLensApolloClient([
        mockHidePublicationResponse({
          request: {
            for: publicationId,
          },
        }),
      ]);

      const gateway = new HidePublicationGateway(apolloClient);
      const request = mockHidePublicationRequest({
        publicationId,
      });

      return expect(gateway.hide(request)).resolves.toBeUndefined();
    });
  });
});
