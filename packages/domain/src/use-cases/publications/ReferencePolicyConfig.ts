export enum ReferencePolicyType {
  UNKNOWN = 'UNKNOWN',
  DEGREES_OF_SEPARATION = 'DEGREES_OF_SEPARATION',
  FOLLOWERS_ONLY = 'FOLLOWERS_ONLY',
  ANYONE = 'ANYONE',
}

type FollowersOnlyPolicy = {
  type: ReferencePolicyType.FOLLOWERS_ONLY;
};

type DegreesOfSeparationPolicy = {
  type: ReferencePolicyType.DEGREES_OF_SEPARATION;
  params: {
    commentsRestricted: boolean;
    mirrorsRestricted: boolean;
    degreesOfSeparation: number;
  };
};

type AnyonePolicy = {
  type: ReferencePolicyType.ANYONE;
};

export type ReferencePolicyConfig = FollowersOnlyPolicy | DegreesOfSeparationPolicy | AnyonePolicy;
