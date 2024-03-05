import { FetchPolicy } from '@apollo/client';
import {
  AllFragmentVariables,
  AnyPublication,
  Comment,
  FragmentAnyPublicationInternal,
  isCommentPublication,
  isMirrorPublication,
  isPostPublication,
  isQuotePublication,
  Mirror,
  Post,
  PublicationData,
  PublicationDocument,
  PublicationRequest,
  PublicationVariables,
  Quote,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';
import {
  CreateCommentRequest,
  CreateMirrorRequest,
  CreatePostRequest,
  CreateQuoteRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { IPublicationCacheManager } from '../adapters/IPublicationCacheManager';

export class PublicationCacheManager implements IPublicationCacheManager {
  constructor(
    private readonly client: SafeApolloClient,
    private readonly variables: AllFragmentVariables,
  ) {}

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

  async fetchNewMirror(tx: TransactionData<CreateMirrorRequest>): Promise<Mirror> {
    const publication = await this.fetchNewPublication(tx);
    invariant(isMirrorPublication(publication), `Unexpected publication type`);
    return publication;
  }

  async fetchNewQuote(tx: TransactionData<CreateQuoteRequest>): Promise<Quote> {
    const publication = await this.fetchNewPublication(tx);
    invariant(isQuotePublication(publication), `Unexpected publication type`);
    return publication;
  }

  async refresh(publicationId: PublicationId): Promise<void> {
    await this.request({ forId: publicationId }, 'network-only');
  }

  update(
    publicationId: PublicationId,
    updateFn: <TPublication extends AnyPublication>(current: TPublication) => TPublication,
  ) {
    this.client.cache.updateFragment(
      {
        id: this.client.cache.identify({ __typename: 'AnyPublication', id: publicationId }),
        fragment: FragmentAnyPublicationInternal,
        fragmentName: 'AnyPublicationInternal',
        variables: this.variables,
      },
      (data: AnyPublication | null) => {
        if (data) {
          return updateFn(data);
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
      variables: { request, ...this.variables },
      fetchPolicy,
    });

    return data.result;
  }
}
