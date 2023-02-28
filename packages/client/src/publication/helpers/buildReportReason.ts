import { assertNever } from '@lens-protocol/shared-kernel';

import {
  PublicationReportingFraudSubreason,
  PublicationReportingIllegalSubreason,
  PublicationReportingReason,
  PublicationReportingSensitiveSubreason,
  PublicationReportingSpamSubreason,
  ReportingReasonInputParams,
} from '../../graphql/types.generated';

export enum PublicationReportReason {
  // Illegal
  ANIMAL_ABUSE = 'ANIMAL_ABUSE',
  HARASSMENT = 'HARASSMENT',
  VIOLENCE = 'VIOLENCE',
  SELF_HARM = 'SELF_HARM',
  DIRECT_THREAT = 'DIRECT_THREAT',
  HATE_SPEECH = 'HATE_SPEECH',

  // Sensitive content
  NUDITY = 'NUDITY',
  OFFENSIVE = 'OFFENSIVE',

  // Fraud
  SCAM = 'SCAM',
  UNAUTHORIZED_SALE = 'UNAUTHORIZED_SALE',
  IMPERSONATION = 'IMPERSONATION',

  // Spam
  MISLEADING = 'MISLEADING',
  MISUSE_HASHTAGS = 'MISUSE_HASHTAGS',
  UNRELATED = 'UNRELATED',
  REPETITIVE = 'REPETITIVE',
  FAKE_ENGAGEMENT = 'FAKE_ENGAGEMENT',
  MANIPULATION_ALGO = 'MANIPULATION_ALGO',
  SOMETHING_ELSE = 'SOMETHING_ELSE',
}

export const buildReportReason = (reason: PublicationReportReason): ReportingReasonInputParams => {
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
