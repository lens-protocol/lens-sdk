import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.momoka.transaction({
    for: 'Go2-u7-11rykJn9nS7nNlQW4Bl2w0c3EOnn1_99Zltk',
  });

  console.log('Result: ', result);
}

main();
