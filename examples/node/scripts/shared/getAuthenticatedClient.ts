import { LensClient, development } from "@lens-protocol/client";
import { Wallet } from "ethers";
import { WalletClient } from "viem";

export async function getAuthenticatedClientFromEthersWallet(wallet: Wallet): Promise<LensClient> {
  const lensClient = new LensClient({
    environment: development,
  });

  const address = await wallet.getAddress();

  const { id, text } = await lensClient.authentication.generateChallenge({
    address,
    profileId: "0x001",
  });
  const signature = await wallet.signMessage(text);

  await lensClient.authentication.authenticate({ id, signature });

  return lensClient;
}

export async function getAuthenticatedClientFromViemWalletClient(walletClient: WalletClient) {
  const lensClient = new LensClient({
    environment: development,
  });

  const address = walletClient.account.address;

  const { id, text } = await lensClient.authentication.generateChallenge({
    address,
    profileId: "0x001",
  });
  const signature = await walletClient.signMessage({ account: address, message: text });

  lensClient.authentication.authenticate({ id, signature });

  return lensClient;
}

export async function refreshJWT(accessToken: string) {
  const lensClient = new LensClient({
    environment: development,
  });

  const newAccessToken = await lensClient.authentication.getAccessToken();

  return newAccessToken;
}
