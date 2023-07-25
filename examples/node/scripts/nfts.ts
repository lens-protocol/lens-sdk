import { getActiveProfile } from "./shared/getActiveProfile";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClient(wallet);
  const profile = await getActiveProfile(lensClient, address);
  const profileId = profile.id;

  const allNfts = await lensClient.nfts.fetch({
    chainIds: [80001],
    ownerAddress: profile.ownedBy,
  });

  const nftsForGallery = allNfts.items.slice(0, 3).map((i) => ({
    contractAddress: i.contractAddress,
    tokenId: i.tokenId,
    chainId: i.chainId,
  }));

  console.log("First 3 of your NFTs: ", nftsForGallery);

  const createGalleryResult = await lensClient.nfts.createGallery({
    profileId,
    name: "test gallery",
    items: nftsForGallery,
  });

  console.log("Gallery created with result: ", createGalleryResult);

  const fetchGalleriesResult = await lensClient.nfts.fetchGalleries({
    profileId,
  });

  console.log("Your NFT galleries: ", fetchGalleriesResult);
}

main();
