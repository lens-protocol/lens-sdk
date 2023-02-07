import { randomPath as randomUrlPath } from './utils';
import LitJsSdk from '../src/lit/lit-protocol-sdk/index.js';

const litNodeClient = new LitJsSdk.LitNodeClient();
litNodeClient.connect();
const chain = 'polygon';

const provisionAndSign = async (accessControlConditions) => {
  let authSig = JSON.parse(
    '{"sig":"0x18a173d68d2f78cc5c13da0dfe36eec2a293285bee6d42547b9577bf26cdc985660ed3dddc4e75d422366cac07e8a9fc77669b10373bef9c7b8e4280252dfddf1b","derivedVia":"web3.eth.personal.sign","signedMessage":"I am creating an account to use LITs at 2021-08-04T20:14:04.918Z","address":"0xdbd360f30097fb6d938dcc8b7b62854b36160b45"}'
  );

  let resourceId = {
    baseUrl: 'https://my-dynamic-content-server.com',
    path: randomUrlPath(),
    orgId: '',
  };

  await litNodeClient.saveSigningCondition({
    accessControlConditions,
    chain,
    authSig,
    resourceId,
  });

  let jwt = await litNodeClient.getSignedToken({
    accessControlConditions,
    chain,
    authSig,
    resourceId,
  });

  console.log(jwt);

  if (jwt) {
    return true;
  }
  return false;
};

const accessControlConditions = [
  [
    // Must posess at least one ERC1155 token with a given token id
    {
      contractAddress: '0x7C7757a9675f06F3BE4618bB68732c4aB25D2e88',
      standardContractType: 'ERC1155',
      chain,
      method: 'balanceOf',
      parameters: [':userAddress', '8'],
      returnValueTest: {
        comparator: '>',
        value: '0',
      },
    },
  ],
];

const runTests = async () => {
  for (let i = 0; i < accessControlConditions.length; i++) {
    const res = await provisionAndSign(accessControlConditions[i]);
    if (res === false) {
      console.log('Error on access control conditions: ', accessControlConditions[i]);
      process.exit(1);
    }
  }
};

runTests();
