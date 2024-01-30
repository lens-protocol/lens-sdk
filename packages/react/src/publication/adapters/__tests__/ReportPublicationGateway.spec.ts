import { faker } from '@faker-js/faker';
import {
  PublicationReportingFraudSubreason,
  PublicationReportingIllegalSubreason,
  PublicationReportingReason,
  PublicationReportingSensitiveSubreason,
  PublicationReportingSpamSubreason,
} from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockReportPublicationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { PublicationReportReason } from '@lens-protocol/domain/entities';
import { mockPublicationId, mockReportPublicationRequest } from '@lens-protocol/domain/mocks';

import { ReportPublicationGateway } from '../ReportPublicationGateway';

describe(`Given an instance of the ${ReportPublicationGateway.name}`, () => {
  describe(`when invoking the ${ReportPublicationGateway.prototype.report.name} method`, () => {
    it.each([
      {
        reason: PublicationReportReason.VIOLENCE,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.Violence,
          },
        },
      },
      {
        reason: PublicationReportReason.SELF_HARM,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.ThreatIndividual,
          },
        },
      },
      {
        reason: PublicationReportReason.DIRECT_THREAT,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.DirectThreat,
          },
        },
      },
      {
        reason: PublicationReportReason.HARASSMENT,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.HumanAbuse,
          },
        },
      },
      {
        reason: PublicationReportReason.HATE_SPEECH,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.HumanAbuse,
          },
        },
      },
      {
        reason: PublicationReportReason.ANIMAL_ABUSE,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.AnimalAbuse,
          },
        },
      },
      {
        reason: PublicationReportReason.SCAM,
        expectedRequestReason: {
          fraudReason: {
            reason: PublicationReportingReason.Fraud,
            subreason: PublicationReportingFraudSubreason.Scam,
          },
        },
      },
      {
        reason: PublicationReportReason.UNAUTHORIZED_SALE,
        expectedRequestReason: {
          fraudReason: {
            reason: PublicationReportingReason.Fraud,
            subreason: PublicationReportingFraudSubreason.Scam,
          },
        },
      },
      {
        reason: PublicationReportReason.IMPERSONATION,
        expectedRequestReason: {
          fraudReason: {
            reason: PublicationReportingReason.Fraud,
            subreason: PublicationReportingFraudSubreason.Impersonation,
          },
        },
      },
      {
        reason: PublicationReportReason.NUDITY,
        expectedRequestReason: {
          sensitiveReason: {
            reason: PublicationReportingReason.Sensitive,
            subreason: PublicationReportingSensitiveSubreason.Nsfw,
          },
        },
      },
      {
        reason: PublicationReportReason.OFFENSIVE,
        expectedRequestReason: {
          sensitiveReason: {
            reason: PublicationReportingReason.Sensitive,
            subreason: PublicationReportingSensitiveSubreason.Offensive,
          },
        },
      },
      {
        reason: PublicationReportReason.MISLEADING,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.Misleading,
          },
        },
      },
      {
        reason: PublicationReportReason.MISUSE_HASHTAGS,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.MisuseHashtags,
          },
        },
      },
      {
        reason: PublicationReportReason.UNRELATED,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.Unrelated,
          },
        },
      },
      {
        reason: PublicationReportReason.REPETITIVE,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.Repetitive,
          },
        },
      },
      {
        reason: PublicationReportReason.FAKE_ENGAGEMENT,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.FakeEngagement,
          },
        },
      },
      {
        reason: PublicationReportReason.MANIPULATION_ALGO,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.ManipulationAlgo,
          },
        },
      },
      {
        reason: PublicationReportReason.SOMETHING_ELSE,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.SomethingElse,
          },
        },
      },
    ])(
      `should report the publication mapping the PublicationReportReason.$reason to the expected request`,
      async ({ reason, expectedRequestReason }) => {
        const publicationId = mockPublicationId();
        const additionalComments = faker.lorem.sentence();

        const apolloClient = mockLensApolloClient([
          mockReportPublicationResponse({
            variables: {
              request: { for: publicationId, reason: expectedRequestReason, additionalComments },
            },
          }),
        ]);

        const gateway = new ReportPublicationGateway(apolloClient);
        const request = mockReportPublicationRequest({
          publicationId,
          reason,
          additionalComments,
        });

        return expect(gateway.report(request)).resolves.toBeUndefined();
      },
    );
  });
});
