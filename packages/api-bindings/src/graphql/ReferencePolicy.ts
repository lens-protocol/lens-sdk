import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';

type FollowersOnlyPolicy = {
  type: ReferencePolicyType.FOLLOWERS_ONLY;
};

type UnknownPolicy = {
  type: ReferencePolicyType.UNKNOWN;
  contractAddress: string;
  data: string;
};

type DegreesOfSeparationPolicy = {
  type: ReferencePolicyType.DEGREES_OF_SEPARATION;
  degreesOfSeparation: number;
};

type AnyonePolicy = {
  type: ReferencePolicyType.ANYONE;
};

export type ReferencePolicy =
  | FollowersOnlyPolicy
  | UnknownPolicy
  | DegreesOfSeparationPolicy
  | AnyonePolicy;
