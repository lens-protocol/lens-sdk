import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { Wallet, utils } from 'ethers';
import { SiweMessage } from 'siwe';

export class GatedContent {
  private litClient: LitJsSdk.LitNodeClient;
  public authSignature: {
    sig: string;
    derivedVia: string;
    signedMessage: string;
    address: string;
  } | null = null;

  constructor() {
    this.litClient = new LitJsSdk.LitNodeClient({
      LitJsSdk,
    });
  }

  async connect(signer: Wallet): Promise<void> {
    await this.litClient.connect();
    const domain = 'localhost';
    const origin = 'https://localhost/login';
    const statement = 'This is a test statement.  You can put anything you want here.';

    const siweMessage = new SiweMessage({
      domain,
      address: signer.address,
      statement,
      uri: origin,
      version: '1',
      chainId: 137,
    });

    const messageToSign = siweMessage.prepareMessage();

    const signature = await signer.signMessage(messageToSign);

    const recoveredAddress = utils.verifyMessage(messageToSign, signature);

    this.authSignature = {
      sig: signature,
      derivedVia: 'web3.eth.personal.sign',
      signedMessage: messageToSign,
      address: recoveredAddress,
    };
  }

  async encrypt(data: string) {
    if (!this.authSignature) throw new Error('Not connected');
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(data);

    const accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'polygon',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0', // 0 ETH, so anyone can open
        },
      },
    ];

    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig: this.authSignature,
      chain: 'polygon',
    });

    return { encryptedString, encryptedSymmetricKey };
  }

  async decrypt(encryptedString: Blob, encryptedSymmetricKey: Uint8Array) {
    if (!this.authSignature) throw new Error('Not connected');

    const accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'polygon',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0', // 0 ETH, so anyone can open
        },
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const toDecrypt = LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16') as string;

    const symmetricKey = await litNodeClient.getEncryptionKey({
      accessControlConditions,
      toDecrypt,
      chain: 'polygon',
      authSig: this.authSignature,
    });

    return LitJsSdk.decryptString(encryptedString, symmetricKey);
  }
}
