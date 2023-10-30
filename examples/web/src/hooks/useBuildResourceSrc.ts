const ipfsGateway = 'https://lens.infura-ipfs.io/ipfs/';

const ipfsRegex = /^ipfs:\/\/(.*)$/;

const extractIpfsHash = (ifpsUrl: string) => {
  const match = ipfsRegex.exec(ifpsUrl);

  if (!(match && match[1])) {
    return null;
  }

  return match[1];
};

export const useBuildResourceSrc = (src: string) => {
  if (ipfsRegex.test(src)) {
    return `${ipfsGateway}${extractIpfsHash(src)}`;
  }

  return src;
};
