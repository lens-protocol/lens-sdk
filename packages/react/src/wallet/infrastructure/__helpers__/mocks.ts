import { Networkish } from '@ethersproject/providers';
import { providers } from 'ethers';

export class VoidJsonRpcProvider extends providers.JsonRpcProvider {
  constructor(network: Networkish) {
    super('', network);
    this.send = jest.fn();
  }
}
