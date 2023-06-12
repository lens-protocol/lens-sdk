import { Brand } from '@lens-protocol/shared-kernel';

import { Signature } from './Signature';

export type PollId = Brand<string, 'PollId'>;

export interface IUnsignedVote {
  pollId: PollId;
}

export interface ISignedVote {
  pollId: PollId;
  signature: Signature;
}
