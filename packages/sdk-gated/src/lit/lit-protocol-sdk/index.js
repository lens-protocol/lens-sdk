import { initWasmBlsSdk } from './lib-js/bls-sdk.js';
import { LIT_CHAINS } from './lib-js/constants';
import {
  base64StringToBlob,
  blobToBase64String,
  uint8arrayFromString,
  uint8arrayToString,
} from './utils/browser';

import { decryptWithSymmetricKey, encryptWithSymmetricKey } from './utils/crypto';

import { connectWeb3 } from './utils/eth';

// add window global on nodejs
import {
  inIframe,
  listenForChildFrameMessages,
  listenForFrameParentMessages,
} from './utils/frameComms';

import LitNodeClient from './utils/litNodeClient';

if (typeof window !== 'undefined') {
  // only run this in browser
  if (inIframe()) {
    listenForFrameParentMessages();
  } else {
    listenForChildFrameMessages();
  }
}

initWasmBlsSdk().then((exports) => {
  globalThis.wasmExports = exports;
});

export {
  connectWeb3,
  encryptWithSymmetricKey,
  decryptWithSymmetricKey,
  LIT_CHAINS,
  LitNodeClient,
  uint8arrayFromString,
  uint8arrayToString,
  blobToBase64String,
  base64StringToBlob,
};
