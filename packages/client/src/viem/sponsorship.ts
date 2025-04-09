import type { chains } from '@lens-chain/sdk/viem';
import { type EvmAddress, invariant } from '@lens-protocol/types';
import {
  type Account,
  type Hex,
  type PrepareTransactionRequestParameters,
  type Transport,
  type WalletClient,
  encodeAbiParameters,
  parseAbiParameters,
} from 'viem';
import { getBlock } from 'viem/actions';
import {
  type ZksyncTransactionSerializable,
  type ZksyncTransactionSerializableEIP712,
  getGeneralPaymasterInput,
} from 'viem/zksync';

/**
 * The configuration for the `SponsorshipApprovalSigner`.
 *
 * @experimental This is an experimental helper and may be subject to breaking changes.
 */
export type SponsorshipApprovalSignerConfig<chain extends chains.LensChain> = {
  /**
   * The viem signer to use for signing the sponsorship approval.
   */
  signer: WalletClient<Transport, chain, Account>;
  /**
   * The address of the Sponsorship contract.
   */
  sponsorship: EvmAddress;
  /**
   * The validity period for the sponsorship approval in seconds.
   *
   * @default 5 minutes
   */
  validity?: bigint;
};

type SponsorshipApprovalSignerContext<chain extends chains.LensChain> = {
  signer: WalletClient<Transport, chain, Account>;
  sponsorship: EvmAddress;
  validity: bigint;
};

/**
 * An helper class to sign sponsorship approvals for arbitrary transactions using viem.
 *
 * @experimental This is an experimental helper and may be subject to breaking changes.
 */
export class SponsorshipApprovalSigner<chain extends chains.LensChain> {
  private readonly context: SponsorshipApprovalSignerContext<chain>;

  constructor(config: SponsorshipApprovalSignerConfig<chain>) {
    this.context = {
      signer: config.signer,
      sponsorship: config.sponsorship,
      validity: config.validity ?? 5n * 60n, // 5 minutes
    };
  }

  async approveSponsorship(
    parameters: PrepareTransactionRequestParameters<chain>,
  ): Promise<ZksyncTransactionSerializableEIP712> {
    const deadline = await this.computeDeadline();
    const request: ZksyncTransactionSerializable =
      await this.context.signer.prepareTransactionRequest({
        ...parameters,
        type: 'eip712',
        gasPerPubdata: 50000,
        factoryDeps: [],
        paymaster: this.context.sponsorship,
        paymasterInput: this.encodePaymasterInput(deadline),
        // biome-ignore lint/suspicious/noExplicitAny: prepareTransactionRequest is not type safe for ZkSync params
      } as any);

    const approval = await this.approve(request);

    return {
      ...request,
      paymasterInput: this.encodePaymasterInput(deadline, approval) as Hex,
      // biome-ignore lint/suspicious/noExplicitAny: SendTransactionRequest is not type safe for ZkSync params
    } as any;
  }

  private async approve(request: ZksyncTransactionSerializable): Promise<Hex> {
    invariant(
      typeof this.context.signer.chain.custom?.getEip712Domain === 'function',
      `'getEip712Domain' not found on signer chain ${this.context.signer.chain.id}.`,
    );
    const eip712Domain = this.context.signer.chain.custom?.getEip712Domain({
      ...request,
      chainId: this.context.signer.chain.id,
      type: 'eip712',
    });

    return await this.context.signer.signTypedData(eip712Domain);
  }

  private async computeDeadline(): Promise<bigint> {
    const block = await getBlock(this.context.signer, {
      blockTag: 'latest',
    });
    return block.timestamp + this.context.validity;
  }

  private encodePaymasterInput(deadline: bigint, approval: Hex = '0x'): Hex {
    return getGeneralPaymasterInput({
      innerInput: encodeAbiParameters(parseAbiParameters('address,uint256,bytes'), [
        this.context.signer.account?.address,
        deadline,
        approval,
      ]),
    });
  }
}
