/* eslint-disable react-hooks/rules-of-hooks */
import {
  ProfileFieldsFragment,
  useGetProfileByHandleQuery,
  useGetProfileByIdQuery,
} from '@lens-protocol/api';
import { invariant, never, XOR } from '@lens-protocol/shared-kernel';

import { LensResponse, useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type BaseUseProfileArgs = {
  observerId?: string;
};

type UseProfileByIdArgs = BaseUseProfileArgs & {
  id: string;
};

type UseProfileByHandleArgs = BaseUseProfileArgs & {
  handle: string;
};

function useProfileById({
  id,
  observerId,
}: UseProfileByIdArgs): LensResponse<ProfileFieldsFragment> {
  const { apolloClient } = useSharedDependencies();

  const response = useLensResponse(
    useGetProfileByIdQuery({
      variables: {
        id,
        observerId,
      },
      client: apolloClient,
    }),
  );

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}

function useProfileByHandle({
  handle,
  observerId,
}: UseProfileByHandleArgs): LensResponse<ProfileFieldsFragment> {
  const { apolloClient } = useSharedDependencies();

  const response = useLensResponse(
    useGetProfileByHandleQuery({
      variables: {
        handle,
        observerId,
      },
      client: apolloClient,
    }),
  );

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}

type UseProfileArgs = XOR<UseProfileByIdArgs, UseProfileByHandleArgs>;

export function useProfile(props: UseProfileArgs): LensResponse<ProfileFieldsFragment> {
  invariant(
    props.id === undefined || props.handle === undefined,
    "Only one of 'id' or 'handle' should be provided to useProfile",
  );

  if (props.id !== undefined) {
    return useProfileById(props);
  } else if (props.handle !== undefined) {
    return useProfileByHandle(props);
  }

  never('Invalid props provided to useProfile');
}
