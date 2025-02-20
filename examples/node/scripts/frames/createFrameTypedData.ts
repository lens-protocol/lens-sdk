import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.frames.createFrameTypedData({
    transactionId: '0x0000000000000000000000000000000000000000',
    buttonIndex: 2,
    deadline: new Date(Date.now() + 30 * 60 * 1000).getTime(), // 30 minutes from now
    inputText: 'Hello, World!',
    account: '0x01',
    post: '0x01-0x01',
    specVersion: '1.1.0',
    state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
    url: 'https://mylensframe.xyz',
    app: '0x0000000000000000000000000000000000000000'
  });

  console.log(`Result: `, result);
}

main();
