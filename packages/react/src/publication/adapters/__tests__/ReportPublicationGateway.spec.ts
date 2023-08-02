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
import { ReportReason } from '@lens-protocol/domain/entities';
import { mockPublicationId, mockReportPublicationRequest } from '@lens-protocol/domain/mocks';

import { ReportPublicationGateway } from '../ReportPublicationGateway';

describe(`Given an instance of the ${ReportPublicationGateway.name}`, () => {
  describe(`when invoking the ${ReportPublicationGateway.prototype.report.name} method`, () => {
    it.each([
      {
        reason: ReportReason.VIOLENCE,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.Violence,
          },
        },
      },
      {
        reason: ReportReason.SELF_HARM,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.ThreatIndividual,
          },
        },
      },
      {
        reason: ReportReason.DIRECT_THREAT,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.DirectThreat,
          },
        },
      },
      {
        reason: ReportReason.HARASSMENT,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.HumanAbuse,
          },
        },
      },
      {
        reason: ReportReason.HATE_SPEECH,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.HumanAbuse,
          },
        },
      },
      {
        reason: ReportReason.ANIMAL_ABUSE,
        expectedRequestReason: {
          illegalReason: {
            reason: PublicationReportingReason.Illegal,
            subreason: PublicationReportingIllegalSubreason.AnimalAbuse,
          },
        },
      },
      {
        reason: ReportReason.SCAM,
        expectedRequestReason: {
          fraudReason: {
            reason: PublicationReportingReason.Fraud,
            subreason: PublicationReportingFraudSubreason.Scam,
          },
        },
      },
      {
        reason: ReportReason.UNAUTHORIZED_SALE,
        expectedRequestReason: {
          fraudReason: {
            reason: PublicationReportingReason.Fraud,
            subreason: PublicationReportingFraudSubreason.Scam,
          },
        },
      },
      {
        reason: ReportReason.IMPERSONATION,
        expectedRequestReason: {
          fraudReason: {
            reason: PublicationReportingReason.Fraud,
            subreason: PublicationReportingFraudSubreason.Impersonation,
          },
        },
      },
      {
        reason: ReportReason.NUDITY,
        expectedRequestReason: {
          sensitiveReason: {
            reason: PublicationReportingReason.Sensitive,
            subreason: PublicationReportingSensitiveSubreason.Nsfw,
          },
        },
      },
      {
        reason: ReportReason.OFFENSIVE,
        expectedRequestReason: {
          sensitiveReason: {
            reason: PublicationReportingReason.Sensitive,
            subreason: PublicationReportingSensitiveSubreason.Offensive,
          },
        },
      },
      {
        reason: ReportReason.MISLEADING,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.Misleading,
          },
        },
      },
      {
        reason: ReportReason.MISUSE_HASHTAGS,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.MisuseHashtags,
          },
        },
      },
      {
        reason: ReportReason.UNRELATED,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.Unrelated,
          },
        },
      },
      {
        reason: ReportReason.REPETITIVE,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.Repetitive,
          },
        },
      },
      {
        reason: ReportReason.FAKE_ENGAGEMENT,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.FakeEngagement,
          },
        },
      },
      {
        reason: ReportReason.MANIPULATION_ALGO,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.ManipulationAlgo,
          },
        },
      },
      {
        reason: ReportReason.SOMETHING_ELSE,
        expectedRequestReason: {
          spamReason: {
            reason: PublicationReportingReason.Spam,
            subreason: PublicationReportingSpamSubreason.SomethingElse,
          },
        },
      },
    ])(
      `should report the publication mapping the ReportReason.$reason to the expected request`,
      async ({ reason, expectedRequestReason }) => {
        const publicationId = mockPublicationId();
        const additionalComments = faker.lorem.sentence();

        const apolloClient = mockLensApolloClient([
          mockReportPublicationResponse({
            variables: {
              publicationId,
              reason: expectedRequestReason,
              additionalComments,
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
