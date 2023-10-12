import { Data, Erc20Amount, EvmAddress } from '@lens-protocol/shared-kernel';

export type RecipientWithSplit = {
  recipient: EvmAddress;
  split: number;
};

export enum OpenActionType {
  SIMPLE_COLLECT = 'SIMPLE_COLLECT',
  MULTIRECIPIENT_COLLECT = 'MULTIRECIPIENT_COLLECT',
  UNKNOWN_OPEN_ACTION = 'UNKNOWN_OPEN_ACTION',
}

export type SimpleCollectActionConfig = {
  type: OpenActionType.SIMPLE_COLLECT;
  amount?: Erc20Amount;
  referralFee?: number;
  recipient?: EvmAddress;
  collectLimit?: number;
  followerOnly: boolean;
  endsAt?: Date;
};

export type MultirecipientCollectActionConfig = {
  type: OpenActionType.MULTIRECIPIENT_COLLECT;
  amount: Erc20Amount;
  referralFee?: number;
  recipients: RecipientWithSplit[];
  collectLimit?: number;
  followerOnly: boolean;
  endsAt?: Date;
};

export type CollectActionConfig = SimpleCollectActionConfig | MultirecipientCollectActionConfig;

export type UnknownOpenActionConfig = {
  type: OpenActionType.UNKNOWN_OPEN_ACTION;
  address: EvmAddress;
  data: Data;
};

export type OpenActionConfig = CollectActionConfig | UnknownOpenActionConfig;
