import 'cross-fetch/polyfill';
import { TextDecoder } from 'util';
import { Crypto } from '@peculiar/webcrypto';

(global as any).TextDecoder = TextDecoder;
(global as any).crypto = new Crypto();
