import { LensClient, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const accessToken = "YOUR_ACCESS_TOKEN";

  const isVerified = await lensClient.authentication.verify(accessToken);

  console.log(`Token is ${isVerified ? "valid" : "invalid"}`);
}

main();
