import { faker } from '@faker-js/faker';
import {
  createMockApolloClientWithMultipleResponses,
  createHidePublicationMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockHidePublicationRequest } from '@lens-protocol/domain/mocks';

import { HidePublicationGateway } from '../HidePublicationGateway';

describe(`Given an instance of the ${HidePublicationGateway.name}`, () => {
  describe(`when the ${HidePublicationGateway.prototype.hide.name} method is invoked`, () => {
    it(`should perform the expected mutation request`, async () => {
      const publicationId = faker.datatype.uuid();

      const apolloClient = createMockApolloClientWithMultipleResponses([
        createHidePublicationMockedResponse({
          variables: {
            publicationId,
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
