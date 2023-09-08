import { WebCryptoEncryptionProvider } from './WebCryptoEncryptionProvider';

/**
 * Creates a new {@link IEncryptionProvider} instance that uses the Web Crypto API.
 *
 * @see https://nodejs.org/docs/latest-v18.x/api/webcrypto.html
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
 */
export function webCryptoProvider() {
  return new WebCryptoEncryptionProvider();
}
