import { ApolloProvider } from '@apollo/client';
import {
  createApolloClient,
  ProfileFieldsFragment,
  useProfilesToFollowQuery,
} from '@lens-protocol/api';
import { ReactNode } from 'react';

import { mock32BytesHexString } from '@lens-protocol/shared-kernel/tests';

export function useProfilesToFollow() {
  return useProfilesToFollowQuery();
}

export type { ProfileFieldsFragment };

type LensClientProps = {
  children: ReactNode;
};

export function LensClient({ children }: LensClientProps) {
  const client = createApolloClient({
    backendURL: 'https://api.lens.dev',
  });

  mock32BytesHexString();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
