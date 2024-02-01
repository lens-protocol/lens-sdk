import {
  SafeApolloClient,
  PublicationReportingFraudSubreason,
  PublicationReportingIllegalSubreason,
  PublicationReportingReason,
  PublicationReportingSensitiveSubreason,
  PublicationReportingSpamSubreason,
  ReportingReasonInput,
  ReportPublicationDocument,
  ReportPublicationData,
  ReportPublicationVariables,
} from '@lens-protocol/api-bindings';
import { PublicationReportReason } from '@lens-protocol/domain/entities';
import {
  IReportPublicationGateway,
  ReportPublicationRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { assertNever } from '@lens-protocol/shared-kernel';

const mapReportReasonToInput = (reason: PublicationReportReason): ReportingReasonInput => {
  switch (reason) {
    case PublicationReportReason.VIOLENCE:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.Violence,
        },
      };
    case PublicationReportReason.SELF_HARM:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.ThreatIndividual,
        },
      };
    case PublicationReportReason.DIRECT_THREAT:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.DirectThreat,
        },
      };
    case PublicationReportReason.HARASSMENT:
    case PublicationReportReason.HATE_SPEECH:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.HumanAbuse,
        },
      };
    case PublicationReportReason.ANIMAL_ABUSE:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.AnimalAbuse,
        },
      };
    case PublicationReportReason.SCAM:
    case PublicationReportReason.UNAUTHORIZED_SALE:
      return {
        fraudReason: {
          reason: PublicationReportingReason.Fraud,
          subreason: PublicationReportingFraudSubreason.Scam,
        },
      };
    case PublicationReportReason.IMPERSONATION:
      return {
        fraudReason: {
          reason: PublicationReportingReason.Fraud,
          subreason: PublicationReportingFraudSubreason.Impersonation,
        },
      };
    case PublicationReportReason.NUDITY:
      return {
        sensitiveReason: {
          reason: PublicationReportingReason.Sensitive,
          subreason: PublicationReportingSensitiveSubreason.Nsfw,
        },
      };
    case PublicationReportReason.OFFENSIVE:
      return {
        sensitiveReason: {
          reason: PublicationReportingReason.Sensitive,
          subreason: PublicationReportingSensitiveSubreason.Offensive,
        },
      };
    case PublicationReportReason.MISLEADING:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.Misleading,
        },
      };
    case PublicationReportReason.MISUSE_HASHTAGS:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.MisuseHashtags,
        },
      };
    case PublicationReportReason.UNRELATED:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.Unrelated,
        },
      };
    case PublicationReportReason.REPETITIVE:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.Repetitive,
        },
      };
    case PublicationReportReason.FAKE_ENGAGEMENT:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.FakeEngagement,
        },
      };
    case PublicationReportReason.MANIPULATION_ALGO:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.ManipulationAlgo,
        },
      };
    case PublicationReportReason.SOMETHING_ELSE:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.SomethingElse,
        },
      };
    default:
      assertNever(reason, `Unknown report type`);
  }
};

export class ReportPublicationGateway implements IReportPublicationGateway {
  constructor(private apolloClient: SafeApolloClient) {}

  async report({ additionalComments, publicationId, reason }: ReportPublicationRequest) {
    await this.apolloClient.mutate<ReportPublicationData, ReportPublicationVariables>({
      mutation: ReportPublicationDocument,
      variables: {
        request: {
          for: publicationId,
          additionalComments,
          reason: {
            ...mapReportReasonToInput(reason),
          },
        },
      },
    });
  }
}
