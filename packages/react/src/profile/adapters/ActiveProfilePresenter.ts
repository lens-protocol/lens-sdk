import { ApolloClient, makeVar, NormalizedCacheObject, useReactiveVar } from '@apollo/client';
import {
  GetProfileByIdDocument,
  GetProfileByIdQuery,
  GetProfileByIdQueryVariables,
  ProfileFieldsFragment,
} from '@lens-protocol/api';
import { IActiveProfilePresenter, ProfileData } from '@lens-protocol/domain/use-cases/profile';

export const activeProfileVar = makeVar<ProfileFieldsFragment | null>(null);

export class ActiveProfilePresenter implements IActiveProfilePresenter {
  private activeProfileCacheSubscription: { unsubscribe: () => void } | null = null;

  constructor(private readonly apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async presentActiveProfile(profileData: ProfileData | null): Promise<void> {
    if (this.activeProfileCacheSubscription) {
      this.activeProfileCacheSubscription.unsubscribe();
      this.activeProfileCacheSubscription = null;
    }

    if (profileData) {
      const observable = this.apolloClient.watchQuery<
        GetProfileByIdQuery,
        GetProfileByIdQueryVariables
      >({
        query: GetProfileByIdDocument,
        variables: {
          id: profileData.id,
        },
        nextFetchPolicy: 'cache-only',
      });

      const queryResult = await observable.result();

      const profile = queryResult.data.result;

      activeProfileVar(profile);

      // watch for all the changes in the cache to make sure the active profile is always up to date
      this.activeProfileCacheSubscription = observable.subscribe((updatedQueryResult) => {
        const updatedProfile = updatedQueryResult.data.result;

        activeProfileVar(updatedProfile);
      });
    } else {
      activeProfileVar(null);
    }
  }
}

export function useActiveProfile() {
  return useReactiveVar(activeProfileVar);
}
