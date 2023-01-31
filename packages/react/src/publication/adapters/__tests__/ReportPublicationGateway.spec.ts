import { faker } from '@faker-js/faker';
import {
  PublicationReportingReason,
  PublicationReportingSpamSubreason,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createReportPublicationMutationMockedResponse,
  createReportPublicationMutationWithErrorMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { ReportReason } from '@lens-protocol/domain/entities';
import { mockReportPublicationRequest } from '@lens-protocol/domain/mocks';
import { AlreadyReportedError } from '@lens-protocol/domain/use-cases/publications';

import { UnspecifiedError } from '../../../UnspecifiedError';
import { ReportPublicationGateway } from '../ReportPublicationGateway';

describe(`Given an instance of the ${ReportPublicationGateway.name}`, () => {
  describe(`and the ${ReportPublicationGateway.prototype.report.name} method`, () => {
    it(`should report a publication with success`, async () => {
      const publicationId = faker.datatype.uuid();
      const additionalComments = faker.lorem.sentence();

      const apolloClient = createMockApolloClientWithMultipleResponses([
        createReportPublicationMutationMockedResponse({
          variables: {
            publicationId,
            reason: {
              spamReason: {
                reason: PublicationReportingReason.Spam,
                subreason: PublicationReportingSpamSubreason.FakeEngagement,
              },
            },
            additionalComments,
          },
        }),
      ]);

      const gateway = new ReportPublicationGateway(apolloClient);
      const request = mockReportPublicationRequest({
        publicationId,
        reason: ReportReason.FAKE_ENGAGEMENT,
        additionalComments,
      });
      const result = await gateway.report(request);

      expect(result.isSuccess()).toBe(true);
    });

    it(`should fail with AlreadyReportedError if publication was already reported`, async () => {
      const publicationId = faker.datatype.uuid();

      const apolloClient = createMockApolloClientWithMultipleResponses([
        createReportPublicationMutationWithErrorMockedResponse({
          variables: {
            publicationId,
            reason: {
              spamReason: {
                reason: PublicationReportingReason.Spam,
                subreason: PublicationReportingSpamSubreason.FakeEngagement,
              },
            },
            additionalComments: '',
          },
        }),
      ]);

      const gateway = new ReportPublicationGateway(apolloClient);
      const request = mockReportPublicationRequest({
        publicationId,
        reason: ReportReason.FAKE_ENGAGEMENT,
        additionalComments: '',
      });
      const result = await gateway.report(request);

      expect(result.isFailure()).toBe(true);
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(AlreadyReportedError);
      }
    });

    it(`should throw NetworkError if unknown reason`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        // no mocks on purpose to trigger network issue
      ]);

      const gateway = new ReportPublicationGateway(apolloClient);
      const request = mockReportPublicationRequest();

      await expect(gateway.report(request)).rejects.toThrow(UnspecifiedError);
    });
  });
});
