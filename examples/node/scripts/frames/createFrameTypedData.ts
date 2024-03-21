import { FramesEip721TypedDataSpec, LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const deadline = new Date();
  deadline.setMinutes(deadline.getMinutes() + 30);

  const result = await client.frames.createFrameTypedData({
    actionResponse: '0x0000000000000000000000000000000000000000',
    buttonIndex: 2,
    deadline: deadline.getTime(),
    inputText: 'Hello, World!',
    profileId: '0x01',
    pubId: '0x01-0x01',
    specVersion: FramesEip721TypedDataSpec.OnePointOnePointOne,
    state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
    url: 'https://mylensframe.xyz',
  });

  console.log(`Result: `, result);
}

main();
