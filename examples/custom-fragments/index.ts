import {
  type Account,
  ArticleMetadataFragment,
  AudioMetadataFragment,
  type FragmentOf,
  ImageMetadataFragment,
  PublicClient,
  TextOnlyMetadataFragment,
  UsernameFragment,
  VideoMetadataFragment,
  evmAddress,
  graphql,
  testnet,
} from '@lens-protocol/client';
import { fetchAccount } from '@lens-protocol/client/actions';

const AccountFragment = graphql(
  `fragment Account on Account {
    __typename
    handle: username {
      ...Username
    }
  }`,
  [UsernameFragment],
);

const PostMetadataFragment = graphql(
  `fragment PostMetadata on PostMetadata {
    __typename
    ... on ArticleMetadata {
      content
    }
    ... on AudioMetadata {
      content
    }
    ... on TextOnlyMetadata {
      content
    }
    ... on ImageMetadata {
      content
    }
    ... on VideoMetadata {
      content
    }
  }`,
  [
    ArticleMetadataFragment,
    AudioMetadataFragment,
    TextOnlyMetadataFragment,
    ImageMetadataFragment,
    VideoMetadataFragment,
  ],
);

const PostFieldsFragment = graphql(
  `fragment PostFields on Post {
    metadata {
      ...PostMetadata
    }
  }`,
  [PostMetadataFragment],
);

declare module '@lens-protocol/client' {
  export interface Account extends FragmentOf<typeof AccountFragment> {}
  export interface PostFields extends FragmentOf<typeof PostFieldsFragment> {}
  export type PostMetadata = FragmentOf<typeof PostMetadataFragment>;
}

const client = PublicClient.create({
  environment: testnet,
  fragments: [AccountFragment, PostFieldsFragment],
});

const account: Account | null = await fetchAccount(client, {
  address: evmAddress('0x57b62a1571F4F09CDB4C3d93dA542bfe142D9F81'),
}).unwrapOr(null);

export default [
  `<h2>${account?.handle?.value}</h2>`,
  `<pre>${JSON.stringify(account, null, 2)}</pre>`,
];
