import { FetchPolicy } from '@apollo/client';
import {
  AnyPublication,
  FragmentPublication,
  GetPublicationData,
  GetPublicationDocument,
  GetPublicationVariables,
  isPostPublication,
  Post,
  SafeApolloClient,
  Sources,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { invariant, OneOf } from '@lens-protocol/shared-kernel';

import { mediaTransformConfigToQueryVariables, MediaTransformsConfig } from '../../mediaTransforms';
import { INewPostCacheManager } from './CreatePostPresenter';
import { IUpdatePublicationCacheManager } from './IUpdatePublicationCacheManager';

type RequestPublicationArgs = OneOf<{
  publicationId: PublicationId;
  txHash: string;
}>;

export class PublicationCacheManager
  implements IUpdatePublicationCacheManager, INewPostCacheManager
{
  constructor(
    private readonly client: SafeApolloClient,
    private readonly sources: Sources,
    private readonly mediaTransforms: MediaTransformsConfig,
  ) {}

  async fetchNewPost({ id, txHash }: TransactionData<CreatePostRequest>): Promise<Post> {
    const publication = await this.request(
      txHash ? { txHash } : { publicationId: id as PublicationId },
      'network-only',
    );

    invariant(publication, `Publication not found`);
    invariant(isPostPublication(publication), `Unexpected publication type`);

    return publication;
  }

  update(
    publicationId: PublicationId,
    updateFn: <TPublication extends AnyPublication>(current: TPublication) => TPublication,
  ) {
    const id = this.client.cache.identify({
      __typename: 'Publication',
      id: publicationId,
    });

    this.client.cache.updateFragment<AnyPublication>(
      {
        id,
        fragmentName: 'Publication',
        fragment: FragmentPublication,
      },
      (data) => {
        if (data) {
          return updateFn(data);
        }
        return null;
      },
    );
  }

  private async request(request: RequestPublicationArgs, fetchPolicy: FetchPolicy) {
    const { data } = await this.client.query<GetPublicationData, GetPublicationVariables>({
      query: GetPublicationDocument,
      variables: {
        request,
        observerId: null, //session?.type === SessionType.WithProfile ? session.profile.id : null,
        sources: this.sources,
        ...mediaTransformConfigToQueryVariables(this.mediaTransforms),
      },
      fetchPolicy,
    });

    return data.result;
  }
}
