import { LensClient, Result } from "@lens-protocol/client";
import { Wallet } from "ethers";

export async function signAndBroadcast(
  client: LensClient,
  wallet: Wallet,
  result: Result<any, any>
) {
  const data = result.unwrap();

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value
  );

  const broadcastResult = await client.transaction.broadcastOnChain({
    id: data.id,
    signature: signedTypedData,
  });

  // broadcastResult is a Result object
  return broadcastResult.unwrap();
}
