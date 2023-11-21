import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';

export type FollowersOnlyPolicy = {
  type: ReferencePolicyType.FOLLOWERS_ONLY;
};

export type UnknownPolicy = {
  type: ReferencePolicyType.UNKNOWN;
  contractAddress: string;
  data: string;
};

export type DegreesOfSeparationPolicy = {
  type: ReferencePolicyType.DEGREES_OF_SEPARATION;
  degreesOfSeparation: number;
};

export type AnyonePolicy = {
  type: ReferencePolicyType.ANYONE;
};

export type ReferencePolicy =
  | FollowersOnlyPolicy
  | UnknownPolicy
  | DegreesOfSeparationPolicy
  | AnyonePolicy;
