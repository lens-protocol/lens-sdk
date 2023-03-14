import { OperationVariables } from '@apollo/client';
import {
  FeedEventItemType as LensFeedEventItemType,
  FeedItemFragment,
  LensApolloClient,
  useFeedQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { nonNullable, Prettify } from '@lens-protocol/shared-kernel';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useActiveProfileIdentifier } from '../profile/useActiveProfileIdentifier';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from '../publication';
import { useSharedDependencies } from '../shared';
import { FeedEventItemType } from './FeedEventItemType';

const SupportedFeedEvenTypesMap: Record<FeedEventItemType, LensFeedEventItemType> = {
  [FeedEventItemType.Comment]: LensFeedEventItemType.Comment,
  [FeedEventItemType.Post]: LensFeedEventItemType.Post,
  [FeedEventItemType.Mirror]: LensFeedEventItemType.Mirror,
  [FeedEventItemType.CollectComment]: LensFeedEventItemType.CollectComment,
  [FeedEventItemType.CollectPost]: LensFeedEventItemType.CollectPost,
};

const mapRestrictEventTypesToLensTypes = (restrictEventTypesTo?: FeedEventItemType[]) => {
  return restrictEventTypesTo?.map((type) =>
    nonNullable(SupportedFeedEvenTypesMap[type], "Can't map the feed event type"),
  );
};

// feed limit is higher than others to get good aggregation of feed items
const FEED_LIMIT = 50;

type UseLensApolloClientArgs<TVariables> = {
  variables: TVariables;
};

type UseLensApolloClientResult<TVariables> = Prettify<
  UseLensApolloClientArgs<TVariables> & {
    client: LensApolloClient;
  }
>;

function useLensApolloClient<TVariables extends OperationVariables = OperationVariables>(
  options: UseLensApolloClientArgs<TVariables>,
): UseLensApolloClientResult<TVariables> {
  const { apolloClient } = useSharedDependencies();

  return {
    ...options,
    client: apolloClient,
  };
}

type UseActiveProfileAsDefaultObserverArgs = { observerId: ProfileId | null };

type UseActiveProfileAsDefaultObserverResult<TArgs extends UseActiveProfileAsDefaultObserverArgs> =
  {
    variables: Omit<TArgs, 'observerId'> & { observerId: ProfileId | null };
    skip: boolean;
  };

function useActiveProfileAsDefaultObserver<TArgs extends UseActiveProfileAsDefaultObserverArgs>({
  observerId,
  ...others
}: TArgs): UseActiveProfileAsDefaultObserverResult<TArgs> {
  const { data: activeProfile, loading: bootstrapping } = useActiveProfileIdentifier();

  return {
    variables: {
      ...others,
      observerId: observerId ?? activeProfile?.id ?? null,
    },
    skip: bootstrapping,
  };
}

function useConfigSources<TArgs extends OperationVariables>(args: TArgs) {
  const { sources } = useSharedDependencies();

  return {
    ...args,
    sources,
  };
}

export type UseFeedArgs = PaginatedArgs<{
  observerId?: string | null;
  profileId: string;
  restrictEventTypesTo?: FeedEventItemType[];
  metadataFilter?: PublicationMetadataFilters;
}>;

export function useFeed({
  metadataFilter,
  restrictEventTypesTo,
  observerId = null,
  profileId,
  limit = FEED_LIMIT,
}: UseFeedArgs): PaginatedReadResult<FeedItemFragment[]> {
  return usePaginatedReadResult(
    useFeedQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver(
          useConfigSources({
            metadata: createPublicationMetadataFilters(metadataFilter),
            restrictEventTypesTo: mapRestrictEventTypesToLensTypes(restrictEventTypesTo),
            profileId,
            observerId,
            limit,
          }),
        ),
      ),
    ),
  );
}
