import { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client';
import {
  PublicationReportingFraudSubreason,
  PublicationReportingIllegalSubreason,
  PublicationReportingReason,
  PublicationReportingSensitiveSubreason,
  PublicationReportingSpamSubreason,
  ReportingReasonInputParams,
  ReportPublicationDocument,
  ReportPublicationMutation,
  ReportPublicationMutationVariables,
} from '@lens-protocol/api-bindings';
import { ReportReason } from '@lens-protocol/domain/entities';
import {
  AlreadyReportedError,
  IReportPublicationGateway,
  NetworkError,
  ReportPublicationRequest,
} from '@lens-protocol/domain/use-cases/publications';
import {
  assertError,
  assertNever,
  failure,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';

const mapReportReasonToInput = (reason: ReportReason): ReportingReasonInputParams => {
  switch (reason) {
    case ReportReason.VIOLENCE:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.Violence,
        },
      };
    case ReportReason.SELF_HARM:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.ThreatIndividual,
        },
      };
    case ReportReason.DIRECT_THREAT:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.DirectThreat,
        },
      };
    case ReportReason.HARASSMENT:
    case ReportReason.HATE_SPEECH:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.HumanAbuse,
        },
      };
    case ReportReason.ANIMAL_ABUSE:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.AnimalAbuse,
        },
      };
    case ReportReason.SCAM:
    case ReportReason.UNAUTHORIZED_SALE:
      return {
        fraudReason: {
          reason: PublicationReportingReason.Fraud,
          subreason: PublicationReportingFraudSubreason.Scam,
        },
      };
    case ReportReason.IMPERSONATION:
      return {
        fraudReason: {
          reason: PublicationReportingReason.Fraud,
          subreason: PublicationReportingFraudSubreason.Impersonation,
        },
      };
    case ReportReason.NUDITY:
      return {
        sensitiveReason: {
          reason: PublicationReportingReason.Sensitive,
          subreason: PublicationReportingSensitiveSubreason.Nsfw,
        },
      };
    case ReportReason.OFFENSIVE:
      return {
        sensitiveReason: {
          reason: PublicationReportingReason.Sensitive,
          subreason: PublicationReportingSensitiveSubreason.Offensive,
        },
      };
    case ReportReason.MISLEADING:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.Misleading,
        },
      };
    case ReportReason.MISUSE_HASHTAGS:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.MisuseHashtags,
        },
      };
    case ReportReason.UNRELATED:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.Unrelated,
        },
      };
    case ReportReason.REPETITIVE:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.Repetitive,
        },
      };
    case ReportReason.FAKE_ENGAGEMENT:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.FakeEngagement,
        },
      };
    case ReportReason.MANIPULATION_ALGO:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.ManipulationAlgo,
        },
      };
    case ReportReason.SOMETHING_ELSE:
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
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async report({
    additionalComments,
    publicationId,
    reason,
  }: ReportPublicationRequest): PromiseResult<void, AlreadyReportedError> {
    try {
      await this.apolloClient.mutate<ReportPublicationMutation, ReportPublicationMutationVariables>(
        {
          mutation: ReportPublicationDocument,
          variables: {
            publicationId,
            additionalComments,
            reason: {
              ...mapReportReasonToInput(reason),
            },
          },
        },
      );

      return success();
    } catch (e) {
      assertError(e);

      if (e instanceof ApolloError) {
        if (e.graphQLErrors.some((error) => error.message === 'Publication already reported')) {
          return failure(new AlreadyReportedError());
        }
      }

      throw new NetworkError(e);
    }
  }
}
