import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.nfts.updateGalleryItems({
    galleryId: 'GALLERY_ID',
    toAdd: [
      {
        contract: {
          address: '0x1234123412341234123412341234123412341234', // an NFT that wallet owns
          chainId: 5,
        },
        tokenId: '1',
      },
    ],
    toRemove: [
      {
        contract: {
          address: '0x1234123412341234123412341234123412341234', // an NFT that wallet owns
          chainId: 5,
        },
        tokenId: '2',
      },
    ],
  });

  console.log('Result: ', result.unwrap());
}

main();
