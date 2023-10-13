import { ProfileId } from '../../entities';

export enum ReferencePolicyType {
  UNKNOWN = 'UNKNOWN',
  DEGREES_OF_SEPARATION = 'DEGREES_OF_SEPARATION',
  FOLLOWERS_ONLY = 'FOLLOWERS_ONLY',
  NO_ONE = 'NO_ONE',
  ANYONE = 'ANYONE',
}

export type FollowersOnlyReferencePolicyConfig = {
  type: ReferencePolicyType.FOLLOWERS_ONLY;
};

export type DegreesOfSeparationReferencePolicyConfig = {
  type: ReferencePolicyType.DEGREES_OF_SEPARATION;
  params: {
    /**
     * If true, only profile within the specified degrees of separation can comment.
     */
    commentsRestricted: boolean;
    /**
     * If true, only profile within the specified degrees of separation can mirror.
     */
    mirrorsRestricted: boolean;
    /**
     * The number of degrees of separation from the reference profile.
     */
    degreesOfSeparation: number;
    /**
     * If true, only profile within the specified degrees of separation can quote.
     */
    quotesRestricted: boolean;
    /**
     * You can set the degree to follow someone elses graph.
     *
     * @defaultValue the authenticated Profile ID
     */
    sourceProfileId?: ProfileId;
  };
};

export type NoReferencePolicyConfig = {
  type: ReferencePolicyType.NO_ONE;
};

export type AnyoneReferencePolicyConfig = {
  type: ReferencePolicyType.ANYONE;
};

export type ReferencePolicyConfig =
  | FollowersOnlyReferencePolicyConfig
  | DegreesOfSeparationReferencePolicyConfig
  | NoReferencePolicyConfig
  | AnyoneReferencePolicyConfig;
