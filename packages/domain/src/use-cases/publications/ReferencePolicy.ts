export enum ReferencePolicyType {
  UNKNOWN = 'UNKNOWN',
  DEGREES_OF_SEPARATION = 'DEGREES_OF_SEPARATION',
  FOLLOWERS_ONLY = 'FOLLOWERS_ONLY',
  ANYONE = 'ANYONE',
}

type FollowersOnlyPolicy = {
  type: ReferencePolicyType.FOLLOWERS_ONLY;
};

type UnknownPolicy = {
  type: ReferencePolicyType.UNKNOWN;
  params: {
    contractAddress: string;
    data: string;
  };
};

type DegreesOfSeperationPolicy = {
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

export type ReferencePolicy =
  | FollowersOnlyPolicy
  | UnknownPolicy
  | DegreesOfSeperationPolicy
  | AnyonePolicy;
