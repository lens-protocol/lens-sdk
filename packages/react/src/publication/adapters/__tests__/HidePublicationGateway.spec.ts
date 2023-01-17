import { faker } from '@faker-js/faker';
import {
  createMockApolloClientWithMultipleResponses,
  createHidePublicationMutationMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockHidePublicationRequest } from '@lens-protocol/domain/mocks';
import { NetworkError } from '@lens-protocol/domain/use-cases/publications';

import { HidePublicationGateway } from '../HidePublicationGateway';

describe(`Given an instance of the ${HidePublicationGateway.name}`, () => {
  describe(`and the ${HidePublicationGateway.prototype.hide.name} method`, () => {
    it(`should hide a publication`, async () => {
      const publicationId = faker.datatype.uuid();

      const apolloClient = createMockApolloClientWithMultipleResponses([
        createHidePublicationMutationMockedResponse({
          variables: {
            publicationId,
          },
        }),
      ]);

      const gateway = new HidePublicationGateway(apolloClient);
      const request = mockHidePublicationRequest({
        publicationId,
      });
      const result = await gateway.hide(request);

      expect(result.isSuccess()).toBe(true);
    });

    it(`should throw NetworkError if unknown reason`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        // no mocks on purpose to trigger network issue
      ]);

      const gateway = new HidePublicationGateway(apolloClient);
      const request = mockHidePublicationRequest();

      await expect(gateway.hide(request)).rejects.toThrow(NetworkError);
    });
  });
});
