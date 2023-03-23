export enum ReferencePolicyType {
  UNKNOWN = 'UNKNOWN',
  DEGREES_OF_SEPARATION = 'DEGREES_OF_SEPARATION',
  FOLLOWERS_ONLY = 'FOLLOWERS_ONLY',
  ANYONE = 'ANYONE',
}

export type FollowersOnlyPolicyConfig = {
  type: ReferencePolicyType.FOLLOWERS_ONLY;
};

export type DegreesOfSeparationPolicyConfig = {
  type: ReferencePolicyType.DEGREES_OF_SEPARATION;
  params: {
    commentsRestricted: boolean;
    mirrorsRestricted: boolean;
    degreesOfSeparation: number;
  };
};

export type AnyonePolicyConfig = {
  type: ReferencePolicyType.ANYONE;
};

export type ReferencePolicyConfig =
  | FollowersOnlyPolicyConfig
  | DegreesOfSeparationPolicyConfig
  | AnyonePolicyConfig;
