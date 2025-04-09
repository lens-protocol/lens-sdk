import type { Wallet } from '@lens-chain/sdk/ethers';
import { type EvmAddress, never } from '@lens-protocol/types';
import { type TransactionRequest, ethers } from 'ethers';
import { type types, utils } from 'zksync-ethers';

/**
 * The configuration for the `SponsorshipApprovalSigner`.
 *
 * @experimental This is an experimental helper and may be subject to breaking changes.
 */
export type SponsorshipApprovalSignerConfig = {
  /**
   * The ethers.js signer to use for signing the sponsorship approval.
   */
  signer: Wallet;
  /**
   * The address of the Sponsorship contract.
   */
  sponsorship: EvmAddress;
  /**
   * The validity period for the sponsorship approval in seconds.
   *
   * @default 5 minutes
   */
  validity?: number;
};

type SponsorshipApprovalSignerContext = {
  signer: Wallet;
  sponsorship: EvmAddress;
  validity: number;
};

/**
 * An helper class to sign sponsorship approvals for arbitrary transactions using ethers.js.
 *
 * @experimental This is an experimental helper and may be subject to breaking changes.
 */
export class SponsorshipApprovalSigner {
  private readonly context: SponsorshipApprovalSignerContext;

  constructor(config: SponsorshipApprovalSignerConfig) {
    this.context = {
      signer: config.signer,
      sponsorship: config.sponsorship,
      validity: config.validity ?? 5 * 60, // 5 minutes
    };
  }

  async approveSponsorship(request: TransactionRequest): Promise<types.TransactionLike> {
    const [deadline, nonce, { maxFeePerGas, maxPriorityFeePerGas }, chainId] = await Promise.all([
      this.computeDeadline(),
      this.context.signer.provider.getTransactionCount(
        request.from ?? never("The 'from' field in the transaction request is required."),
        'pending',
      ),
      this.context.signer.provider.estimateFee(request),
      this.context.signer.provider.getNetwork().then((n) => n.chainId),
    ]);

    const preGasEstimation = {
      type: utils.EIP712_TX_TYPE,

      // default values
      data: '0x',
      value: 0n,

      ...request,

      // enforced values
      nonce,
      maxFeePerGas,
      maxPriorityFeePerGas,
      chainId,
      customData: this.fillCustomData(deadline),
    };

    const populatedTransactionRequest = {
      ...preGasEstimation,
      gasLimit: await this.context.signer.provider.estimateGas(preGasEstimation),
    };

    // sponsorship approval
    const approval = await this.context.signer.eip712.sign(populatedTransactionRequest);

    return {
      ...populatedTransactionRequest,
      customData: this.fillCustomData(deadline, approval),
    } as types.TransactionLike;
  }

  private async computeDeadline(): Promise<number> {
    const block = await this.context.signer.provider.getBlock('latest');
    return block.timestamp + this.context.validity;
  }

  private fillCustomData(deadline: number, approval = '0x'): types.Eip712Meta {
    return {
      paymasterParams: utils.getPaymasterParams(this.context.sponsorship, {
        type: 'General',
        innerInput: this.encodePaymasterInput(deadline, approval),
      }),
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      factoryDeps: [],
    };
  }

  private encodePaymasterInput(deadline: number, approval = '0x'): string {
    return ethers.AbiCoder.defaultAbiCoder().encode(
      ['address', 'uint256', 'bytes'],
      [this.context.signer.address, deadline, approval],
    );
  }
}
