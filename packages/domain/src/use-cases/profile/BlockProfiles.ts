import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type BlockProfilesRequest = {
  profileIds: ProfileId[];
  kind: TransactionKind.BLOCK_PROFILE;
  signless: boolean;
};

export class BlockProfiles extends DelegableSigning<BlockProfilesRequest> {}
