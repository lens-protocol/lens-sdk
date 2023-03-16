/**
 * Implementation MUST be able to encrypt and decrypt data using AES-256-CBC.
 */
export interface ICipher {
  /**
   * Implementations MUST return base64-encoded strings of the encrypted data.
   */
  encrypt(data: string): Promise<string>;

  /**
   * Implementations SHOULD assume data is base64-encoded strings representation of the encrypted data.
   */
  decrypt(data: string): Promise<string>;

  exportKey(): Promise<Uint8Array>;
}

export interface IEncryptionProvider {
  createCipher(): Promise<ICipher>;

  importCipher(key: Uint8Array): Promise<ICipher>;
}
