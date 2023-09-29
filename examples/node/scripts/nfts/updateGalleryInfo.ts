import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await client.nfts.updateGalleryInfo({
    galleryId: 'GALLERY_ID',
    name: 'My favorite NFTs',
  });

  console.log('Result: ', result.unwrap());
}

main();
