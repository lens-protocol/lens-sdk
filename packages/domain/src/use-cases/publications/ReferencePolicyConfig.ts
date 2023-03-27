export enum ReferencePolicyType {
  UNKNOWN = 'UNKNOWN',
  DEGREES_OF_SEPARATION = 'DEGREES_OF_SEPARATION',
  FOLLOWERS_ONLY = 'FOLLOWERS_ONLY',
  ANYONE = 'ANYONE',
}

export type FollowersOnlyReferencePolicyConfig = {
  type: ReferencePolicyType.FOLLOWERS_ONLY;
};

export type DegreesOfSeparationReferencePolicyConfig = {
  type: ReferencePolicyType.DEGREES_OF_SEPARATION;
  params: {
    commentsRestricted: boolean;
    mirrorsRestricted: boolean;
    degreesOfSeparation: number;
  };
};

export type AnyoneReferencePolicyConfig = {
  type: ReferencePolicyType.ANYONE;
};

export type ReferencePolicyConfig =
  | FollowersOnlyReferencePolicyConfig
  | DegreesOfSeparationReferencePolicyConfig
  | AnyoneReferencePolicyConfig;
