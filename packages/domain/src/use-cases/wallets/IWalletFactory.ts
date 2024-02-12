import { EvmAddress } from '@lens-protocol/shared-kernel';

import { Wallet } from '../../entities';

export interface IWalletFactory {
  create(address: EvmAddress): Promise<Wallet>;
}
