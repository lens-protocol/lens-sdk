import {
  type Account,
  type FragmentOf,
  PublicClient,
  UsernameFragment,
  evmAddress,
  graphql,
  testnet,
} from '@lens-protocol/client';
import { fetchAccount } from '@lens-protocol/client/actions';

const MyAccountFragment = graphql(
  `
  fragment Account on Account {
    __typename
    handle: username {
      ...Username
    }
  }
  `,
  [UsernameFragment],
);

declare module '@lens-protocol/client' {
  export interface Account extends FragmentOf<typeof MyAccountFragment> {}
}

const client = PublicClient.create({
  environment: testnet,
  fragments: {
    Account: MyAccountFragment,
  },
});

const account: Account | null = await fetchAccount(client, {
  address: evmAddress('0x57b62a1571F4F09CDB4C3d93dA542bfe142D9F81'),
}).unwrapOr(null);

export default [
  `<h2>${account?.handle?.value}</h2>`,
  `<pre>${JSON.stringify(account, null, 2)}</pre>`,
];
