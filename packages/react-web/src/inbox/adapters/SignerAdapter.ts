import { WalletEntity } from '@lens-protocol/react';
import { Signer } from '@xmtp/xmtp-js';

export class SignerAdapter implements Signer {
  constructor(private readonly wallet: WalletEntity) {}

  async getAddress() {
    return this.wallet.address;
  }

  async signMessage(value: string) {
    const result = await this.wallet.signMessage(value);

    return result.unwrap();
  }
}
