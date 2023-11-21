import { Blob } from 'buffer';
import crypto from 'crypto';
import { TextEncoder, TextDecoder } from 'util';

Object.defineProperty(global, 'crypto', {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  value: Object.setPrototypeOf({ subtle: crypto.subtle }, crypto),
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.Blob = Blob;

// until https://github.com/jsdom/jsdom/issues/2524 is resolved
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextDecoder = TextDecoder;
