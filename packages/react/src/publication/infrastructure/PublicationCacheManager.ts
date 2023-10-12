import { FetchPolicy } from '@apollo/client';
import {
  AnyPublication,
  isPostPublication,
  Post,
  PublicationData,
  PublicationDocument,
  PublicationRequest,
  PublicationVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { INewPostCacheManager } from '../../transactions/adapters/CreatePostPresenter';
import { IPublicationCacheManager } from '../adapters/IPublicationCacheManager';

export class PublicationCacheManager implements IPublicationCacheManager, INewPostCacheManager {
  constructor(private readonly client: SafeApolloClient) {}

  async fetchNewPost({ id, txHash }: TransactionData<CreatePostRequest>): Promise<Post> {
    const publication = await this.request(
      txHash ? { forTxHash: txHash } : { forId: id as PublicationId },
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
    this.client.cache.updateQuery<PublicationData, PublicationVariables>(
      {
        query: PublicationDocument,
        variables: {
          request: {
            forId: publicationId,
          },
        },
      },
      (data) => {
        if (data?.result) {
          return {
            ...data,
            result: updateFn(data.result),
          };
        }
        return data;
      },
    );
  }

  private async request(request: PublicationRequest, fetchPolicy: FetchPolicy) {
    const { data } = await this.client.query<PublicationData, PublicationVariables>({
      query: PublicationDocument,
      variables: { request },
      fetchPolicy,
    });

    return data.result;
  }
}
