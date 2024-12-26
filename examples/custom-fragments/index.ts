import 'viem/window';

import {
  type FragmentOf,
  PublicClient,
  evmAddress,
  graphql,
  testnet as protocolTestnet,
} from '@lens-protocol/client';
import { fetchAccount } from '@lens-protocol/client/actions';

const MyAccountFragment = graphql(
  `fragment Account on Account {
    __typename
    address
    username {
      value
    }
    metadata {
      __typename
      name
      picture
    }
  }`,
);

type MyAccount = FragmentOf<typeof MyAccountFragment>;

const client = PublicClient.create({
  environment: protocolTestnet,
  accountFragment: MyAccountFragment,
});

const account: MyAccount | null = await fetchAccount(client, {
  address: evmAddress('0x57b62a1571F4F09CDB4C3d93dA542bfe142D9F81'),
}).unwrapOr(null);

export default [
  `<h2>${account?.username?.value}</h2>`,
  `<pre>${JSON.stringify(account, null, 2)}</pre>`,
];
