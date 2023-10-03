import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await client.nfts.deleteGallery({
    galleryId: 'GALLERY_ID',
  });

  console.log('Result: ', result.unwrap());
}

main();
