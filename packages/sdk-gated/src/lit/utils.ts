import { webcrypto } from 'crypto';
import { isBrowser } from '../utils';

const SYMM_KEY_ALGO_PARAMS = {
  name: 'AES-CBC',
  length: 256,
};

export const getCrypto = () => {
  let c;
  if (isBrowser) {
    c = window.crypto;
  } else {
    try {
      c = webcrypto;
    } catch (err) {}
  }
  if (!c) {
    throw new Error('Crypto library not available');
  }
  return c;
};

export const getSubtleCrypto = (): SubtleCrypto => {
  let c;
  if (isBrowser) {
    c = window.crypto.subtle;
  } else {
    c = webcrypto.subtle;
  }
  if (!c) {
    throw new Error('Could not find Crypto.subtle');
  }
  return c;
};

export const getRandomSymmetricKey = async (): Promise<Uint8Array> => {
  const c = getSubtleCrypto();
  const symmKey = await c.generateKey(SYMM_KEY_ALGO_PARAMS, true, ['encrypt', 'decrypt']);
  const keyBuffer = await c.exportKey('raw', symmKey);
  return new Uint8Array(keyBuffer);
};

export const importSymmetricKey = async (key: Uint8Array): Promise<CryptoKey> => {
  const c = getSubtleCrypto();
  return c.importKey('raw', key, SYMM_KEY_ALGO_PARAMS, true, ['encrypt', 'decrypt']);
};
