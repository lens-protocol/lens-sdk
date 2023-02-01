import 'cross-fetch/polyfill';
import { TextDecoder, TextEncoder } from 'util';
import { Crypto } from '@peculiar/webcrypto';
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
(global as any).window = {
  crypto: new Crypto(),
};
// (global as any).ArrayBuffer = ArrayBuffer;
// (global as any).Uint8Array = Uint8Array;
