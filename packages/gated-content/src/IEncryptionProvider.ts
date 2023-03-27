/**
 * A cipher that can encrypt and decrypt data.
 *
 * Implementation MUST be able to encrypt and decrypt data using AES-256-CBC.
 */
export interface ICipher {
  /**
   * Encrypt the provided data.
   *
   * Implementations MUST return base64-encoded strings of the encrypted data.
   */
  encrypt(data: string): Promise<string>;

  /**
   * Decrypt the provided data.
   *
   * Implementations SHOULD assume data is base64-encoded strings representation of the encrypted data.
   */
  decrypt(data: string): Promise<string>;

  /**
   * Export the AES-256-CBC key in a Uint8Array buffer.
   */
  exportKey(): Promise<Uint8Array>;
}

/**
 * A provider of encryption ciphers.
 */
export interface IEncryptionProvider {
  /**
   * Create a new cipher using a randomly generated AES-256-CBC key.
   */
  createCipher(): Promise<ICipher>;

  /**
   * Import a cipher from an AES-256-CBC key.
   */
  importCipher(key: Uint8Array): Promise<ICipher>;
}
