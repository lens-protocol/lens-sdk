import { invariant } from '../utils';

const ipfsGateway = 'https://ipfs.lens.dev/ipfs/';
const arweaveGateway = 'https://arweave.net/';

const ipfsRegex = /^ipfs:\/\/(.*)$/;
const arweaveRegex = /^ar:\/\/(.*)$/;
const httpsRegex = /^https:\/\/(.*)$/;

const extractIpfsHash = (ifpsUrl: string) => {
  const match = ipfsRegex.exec(ifpsUrl);

  invariant(match && match[1], 'Invalid IPFS URL');

  return match[1];
};

const extractArweaveHash = (arweaveUrl: string) => {
  const match = arweaveRegex.exec(arweaveUrl);

  invariant(match && match[1], 'Invalid Arweave URL');

  return match[1];
};

export const resolveFullResourceUrl = (src: string): string | undefined => {
  if (ipfsRegex.test(src)) {
    return `${ipfsGateway}${extractIpfsHash(src)}`;
  }

  if (arweaveRegex.test(src)) {
    return `${arweaveGateway}${extractArweaveHash(src)}`;
  }

  if (httpsRegex.test(src)) {
    return src;
  }

  return undefined;
};
