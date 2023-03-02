import { WebCryptoEncryptionProvider } from '../WebCryptoEncryptionProvider';

describe(`Given an instance of the ${WebCryptoEncryptionProvider.name}`, () => {
  describe(`when calling the "${WebCryptoEncryptionProvider.prototype.createCipher.name}" method`, () => {
    it(`should create an ICipher able to encrypt and decrypt a given string`, async () => {
      const data = 'test';
      const provider = new WebCryptoEncryptionProvider();
      const key = await provider.createCipher();

      const encrypted = await key.encrypt(data);
      const decrypted = await key.decrypt(encrypted);

      expect(decrypted).toEqual(data);
    });
  });

  describe(`when calling the "${WebCryptoEncryptionProvider.prototype.importCipher.name}" method`, () => {
    it(`should create an ICipher able to decrypt data encrypted with a previous ICipher instance`, async () => {
      const data = 'test';
      const provider = new WebCryptoEncryptionProvider();
      const encryptionKey = await provider.createCipher();

      const encrypted = await encryptionKey.encrypt(data);

      const decryptionKey = await provider.importCipher(await encryptionKey.exportKey());
      const decrypted = await decryptionKey.decrypt(encrypted);

      expect(decrypted).toEqual(data);
    });
  });
});
