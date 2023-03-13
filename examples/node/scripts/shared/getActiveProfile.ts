import LensClient from "@lens-protocol/client";

export async function getActiveProfile(client: LensClient, walletAddress: string) {
  const ownedProfiles = await client.profile.fetchAll({
    ownedBy: [walletAddress],
    limit: 10,
  });

  return ownedProfiles.items[0];
}
