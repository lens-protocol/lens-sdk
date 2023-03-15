import { makeVar, useReactiveVar } from '@apollo/client';
import {
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  LensApolloClient,
  ProfileFragment,
  Sources,
} from '@lens-protocol/api-bindings';
import { CreateProfileRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

import { ProfileHandleResolver } from '../../../environments';

const recentProfilesVar = makeVar<ProfileFragment[]>([]);

// TODO use activeProfileIdentifierVar (maybe move it to api-bindings?)

export class CreateProfileResponder implements ITransactionResponder<CreateProfileRequest> {
  constructor(
    private readonly client: LensApolloClient,
    private readonly sources: Sources,
    private readonly handleResolver: ProfileHandleResolver,
  ) {}

  async commit({ request }: BroadcastedTransactionData<CreateProfileRequest>) {
    const { data } = await this.client.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: {
        request: {
          handle: this.handleResolver(request.handle),
        },
        sources: this.sources,
      },
      fetchPolicy: 'network-only',
    });

    if (data.result) {
      recentProfilesVar([...recentProfilesVar(), data.result]);
    }
  }
}

export function useRecentProfiles() {
  return useReactiveVar(recentProfilesVar);
}
