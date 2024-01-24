import { LensClient, production } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: production,
  });

  // fetch popular collections
  const popular = await client.nfts.popularCollections({
    onlyVerified: true,
  });

  const collection = popular.items[0]?.collection;

  console.log('First collection: ', collection);

  if (!collection) {
    throw new Error('No popular collections found');
  }

  // fetch owners of the first collection
  const result = await client.nfts.collectionOwners({
    for: collection.contract.address,
    chainId: collection.contract.chainId,
  });

  console.log('Result: ', result.items);
}

main();
