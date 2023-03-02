import { SYMM_KEY_ALGO_PARAMS } from '@lit-protocol/constants';
import { encryptWithSymmetricKey, decryptWithSymmetricKey } from '@lit-protocol/crypto';
import { blobToBase64String, base64StringToBlob } from '@lit-protocol/lit-node-client'; //

import { ICipher, IEncryptionProvider } from '../IEncryptionProvider';

class WebCryptoCipher implements ICipher {
  constructor(
    private readonly cryptoKey: CryptoKey,
    private readonly encoder: TextEncoder,
    private readonly decoder: TextDecoder,
  ) {}

  async encrypt(data: string): Promise<string> {
    const buffer = this.encoder.encode(data);
    const blob = await encryptWithSymmetricKey(this.cryptoKey, buffer);
    return blobToBase64String(blob);
  }

  async decrypt(data: string): Promise<string> {
    const encryptedBlob = base64StringToBlob(data);
    const decryptedArrayBuffer = await decryptWithSymmetricKey(encryptedBlob, this.cryptoKey);
    return this.decoder.decode(decryptedArrayBuffer);
  }

  async exportKey(): Promise<Uint8Array> {
    return new Uint8Array(await crypto.subtle.exportKey('raw', this.cryptoKey));
  }
}

export class WebCryptoEncryptionProvider implements IEncryptionProvider {
  private readonly encoder = new TextEncoder();
  private readonly decoder = new TextDecoder();

  async createCipher(): Promise<ICipher> {
    const cryptoKey = await crypto.subtle.generateKey(SYMM_KEY_ALGO_PARAMS, true, [
      'encrypt',
      'decrypt',
    ]);
    return new WebCryptoCipher(cryptoKey, this.encoder, this.decoder);
  }

  async importCipher(key: Uint8Array): Promise<ICipher> {
    const cryptoKey = await crypto.subtle.importKey('raw', key, SYMM_KEY_ALGO_PARAMS, true, [
      'encrypt',
      'decrypt',
    ]);
    return new WebCryptoCipher(cryptoKey, this.encoder, this.decoder);
  }
}
