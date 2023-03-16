import { WebCryptoEncryptionProvider } from './WebCryptoEncryptionProvider';

export function webCryptoProvider() {
  return new WebCryptoEncryptionProvider();
}
