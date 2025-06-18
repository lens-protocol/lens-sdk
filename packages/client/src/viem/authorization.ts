import type { chains } from '@lens-chain/sdk/viem';

import { type EvmAddress, evmAddress } from '@lens-protocol/types';
import { checksumAddress, type TypedDataDefinition } from 'viem';
import type { OperationApprovalRequest } from '../authorization';

export type TypedDataSigner = {
  signTypedData(args: TypedDataDefinition): Promise<string>;
};

export type LocalOperationApprovalSignerContext = {
  app: EvmAddress;
  signer: TypedDataSigner;
  chain: chains.LensChain;
};

export const DOMAIN_NAME = 'Lens Source';
export const DOMAIN_VERSION = '1';

/**
 * An helper class to sign operation approval requests with viem.
 */
export class OperationApprovalSigner {
  constructor(private readonly context: LocalOperationApprovalSignerContext) {}

  async signOperationApproval(data: OperationApprovalRequest): Promise<string> {
    return this.context.signer.signTypedData(
      this.createTypedDataDefinition(data),
    );
  }

  private createTypedDataDefinition(
    data: OperationApprovalRequest,
  ): TypedDataDefinition {
    return {
      domain: {
        name: DOMAIN_NAME,
        version: DOMAIN_VERSION,
        chainId: this.context.chain.id,
        verifyingContract: checksumAddress(this.context.app),
      },
      types: {
        SourceStamp: [
          { name: 'source', type: 'address' },
          { name: 'originalMsgSender', type: 'address' },
          { name: 'validator', type: 'address' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
      },
      primaryType: 'SourceStamp',
      message: {
        source: checksumAddress(this.context.app),
        originalMsgSender: checksumAddress(evmAddress(data.account)),
        validator: checksumAddress(evmAddress(data.validator)),
        nonce: data.nonce,
        deadline: data.deadline,
      },
    };
  }
}
