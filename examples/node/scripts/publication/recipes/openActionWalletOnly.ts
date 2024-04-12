import { LensClient, development } from '@lens-protocol/client';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';

import abi from '../../../abi/PublicActProxy.json';
import type { PublicActProxy } from '../../../contracts/PublicActProxy';

dotenv.config();

const typedAbi = abi as ethers.ContractInterface;

const publicActionProxyAddress = {
  development: '0x88c8fa7C470d9d94aDfA40187157917B26A548d3',
  production: '0x53582b1b7BE71622E7386D736b6baf87749B7a2B',
};

if (!process.env.INFURA_API_KEY) {
  throw new Error('Infura API key is not defined in .env file');
}

const rpcUrl = {
  development: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_API_KEY}`,
  production: `https://polygon.infura.io/v3/${process.env.INFURA_API_KEY}`,
};

async function main() {
  if (!process.env.WALLET_PRIVATE_KEY) {
    throw new Error('Private key is not defined in .env file');
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl.development);
  const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
  const address = await wallet.getAddress();
  const client = new LensClient({
    environment: development,
  });

  // authenticate with wallet only
  const challenge = await client.authentication.generateChallenge({
    signedBy: address,
  });
  const signature = await wallet.signMessage(challenge.text);
  await client.authentication.authenticate({ id: challenge.id, signature });

  // get typed data
  const resultTypedData = await client.publication.actions.createActOnTypedData({
    actOn: {
      simpleCollectOpenAction: true,
    },
    for: '0x02fe-0x01', // you might need to find a different publication id
  });

  const { typedData } = resultTypedData.unwrap();

  // sign the typed data
  const signedTypedData = await wallet._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value,
  );

  // init publicActProxy contract
  const publicActProxy = new ethers.Contract(
    publicActionProxyAddress.development,
    typedAbi,
    wallet,
  ) as PublicActProxy;

  // prepare data for the contract
  const { v, r, s } = ethers.utils.splitSignature(signedTypedData);

  // submit tx
  const tx = await publicActProxy.publicCollectWithSig(
    {
      publicationActedProfileId: typedData.value.publicationActedProfileId,
      publicationActedId: typedData.value.publicationActedId,
      actorProfileId: typedData.value.actorProfileId,
      referrerProfileIds: typedData.value.referrerProfileIds,
      referrerPubIds: typedData.value.referrerPubIds,
      actionModuleAddress: typedData.value.actionModuleAddress,
      actionModuleData: typedData.value.actionModuleData,
    },
    { signer: wallet.address, v, r, s, deadline: typedData.value.deadline },
  );

  console.log(`Submitted a tx with a hash: `, tx.hash);

  console.log(`Waiting for tx to be mined...`);
  const outcome = await client.transaction.waitUntilComplete({
    forTxHash: tx.hash,
  });

  if (outcome === null) {
    console.error('The transaction was not found');
    process.exit(1);
  }

  console.log('Publication collected');
}

main();
