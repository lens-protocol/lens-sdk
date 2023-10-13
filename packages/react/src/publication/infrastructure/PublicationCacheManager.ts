import { FetchPolicy } from '@apollo/client';
import {
  AnyPublication,
  Comment,
  isCommentPublication,
  isPostPublication,
  Post,
  PublicationData,
  PublicationDocument,
  PublicationRequest,
  PublicationVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';
import { CreateQuoteRequest } from '@lens-protocol/domain/src/use-cases/publications/CreateQuote';
import {
  CreateCommentRequest,
  CreateMirrorRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { IPublicationCacheManager } from '../adapters/IPublicationCacheManager';

export class PublicationCacheManager implements IPublicationCacheManager {
  constructor(private readonly client: SafeApolloClient) {}

  async fetchNewPost(tx: TransactionData<CreatePostRequest>): Promise<Post> {
    const publication = await this.fetchNewPublication(tx);
    invariant(isPostPublication(publication), `Unexpected publication type`);
    return publication;
  }

  async fetchNewComment(tx: TransactionData<CreateCommentRequest>): Promise<Comment> {
    const publication = await this.fetchNewPublication(tx);
    invariant(isCommentPublication(publication), `Unexpected publication type`);
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

  private async fetchNewPublication({
    id,
    txHash,
  }: TransactionData<
    CreateCommentRequest | CreateMirrorRequest | CreatePostRequest | CreateQuoteRequest
  >): Promise<AnyPublication> {
    const request = txHash ? { forTxHash: txHash } : { forId: id as PublicationId };
    const publication = await this.request(request, 'network-only');

    invariant(publication, `Publication for ${request.forId ?? request.forTxHash} not found`);

    return publication;
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
