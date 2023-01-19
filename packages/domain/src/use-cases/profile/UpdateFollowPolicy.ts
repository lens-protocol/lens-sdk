import { Amount, Erc20 } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import {
  IProtocolCallPresenter,
  IUnsignedProtocolCallGateway,
  ProtocolCallUseCase,
} from '../transactions/ProtocolCallUseCase';

export enum FollowPolicyType {
  ONLY_PROFILE_OWNERS = 'ONLY_PROFILE_OWNERS',
  CHARGE = 'CHARGE',
  ANYONE = 'ANYONE',
  NO_ONE = 'NO_ONE',
  UNKNOWN = 'UNKNOWN',
}

export type ChargeFollowPolicy = {
  type: FollowPolicyType.CHARGE;
  amount: Amount<Erc20>;
  recipient: string;
};

export type NoFeeFollowPolicy = {
  type: FollowPolicyType.ANYONE | FollowPolicyType.ONLY_PROFILE_OWNERS | FollowPolicyType.NO_ONE;
};

export type UnknownFollowPolicy = {
  type: FollowPolicyType.UNKNOWN;
};

export type FollowPolicy = ChargeFollowPolicy | NoFeeFollowPolicy | UnknownFollowPolicy;

export type SupportedFollowPolicy = ChargeFollowPolicy | NoFeeFollowPolicy;

export type UpdateFollowPolicyRequest = {
  profileId: string;
  policy: SupportedFollowPolicy;
  kind: TransactionKind.UPDATE_FOLLOW_POLICY;
};

export type IFollowPolicyCallGateway = IUnsignedProtocolCallGateway<UpdateFollowPolicyRequest>;

export type IUpdateFollowPolicyPresenter = IProtocolCallPresenter;

export class UpdateFollowPolicy extends ProtocolCallUseCase<UpdateFollowPolicyRequest> {}
