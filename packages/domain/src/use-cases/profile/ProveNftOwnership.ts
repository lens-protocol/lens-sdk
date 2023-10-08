import { EvmAddress, failure, success } from '@lens-protocol/shared-kernel';

import {
  NftOwnershipChallenge,
  Signature,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '../../entities';
import { ActiveWallet } from '../authentication/ActiveWallet';
import { IGenericResultPresenter } from '../transactions/IGenericResultPresenter';

export type ProveNftOwnershipRequest = {
  chainId: number;
  contractAddress: EvmAddress;
  ownerAddress: EvmAddress;
  tokenId: string;
};

export interface INftOwnershipChallengeGateway {
  createOwnershipChallenge(request: ProveNftOwnershipRequest): Promise<NftOwnershipChallenge>;
}

/**
 * @alpha
 */
export type NftOwnershipSignature = {
  id: string;
  signature: Signature;
};

export type IProveNftOwnershipPresenter = IGenericResultPresenter<
  NftOwnershipSignature,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

export class ProveNftOwnership {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: INftOwnershipChallengeGateway,
    private readonly presenter: IProveNftOwnershipPresenter,
  ) {}

  async proveOwnership(request: ProveNftOwnershipRequest) {
    const challenge = await this.gateway.createOwnershipChallenge(request);

    const wallet = await this.activeWallet.requireActiveWallet();

    const signatureResult = await wallet.signMessage(challenge.message);

    if (signatureResult.isFailure()) {
      this.presenter.present(failure(signatureResult.error));
      return;
    }
    this.presenter.present(
      success({
        id: challenge.id,
        signature: signatureResult.value,
      }),
    );
  }
}
