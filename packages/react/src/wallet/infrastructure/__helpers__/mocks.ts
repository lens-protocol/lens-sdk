import { Networkish } from '@ethersproject/providers';
import { ChainType } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { production } from '../../../environments';
import { RequiredSigner } from '../../../wallet/adapters/ConcreteWallet';
import { ISignerBinding } from '../SignerFactory';

export class VoidJsonRpcProvider extends providers.JsonRpcProvider {
  constructor(network: Networkish) {
    super('', network);
    this.send = jest.fn();
  }
}

export function mockISignerBinding({
  chainType,
  signer,
}: {
  chainType?: ChainType;
  signer: RequiredSigner;
}): ISignerBinding {
  const bindings = mock<ISignerBinding>();

  if (chainType) {
    when(bindings.getSigner)
      .calledWith({ chainId: production.chains[chainType].chainId })
      .mockResolvedValue(signer);
  } else {
    when(bindings.getSigner).mockResolvedValue(signer);
  }

  return bindings;
}
