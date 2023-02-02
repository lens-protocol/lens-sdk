// all of these just polyfill `jsdom` to have everything sdk needs

import 'cross-fetch/polyfill';
import 'blob-polyfill';

import { TextDecoder, TextEncoder } from 'util';
import { webcrypto } from 'crypto';

Object.defineProperties(globalThis, {
  crypto: { value: webcrypto },
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});
