import { ApolloCache, DocumentNode, NormalizedCacheObject } from '@apollo/client';
import {
  FragmentComment,
  JustTypename,
  FragmentMirror,
  FragmentPost,
  AnyPublication,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';
import { failure, invariant, never, Result, success } from '@lens-protocol/shared-kernel';

export class FragmentNotFoundError extends Error {
  name = 'FragmentNotFoundError' as const;
}

export const resolveFragmentDoc = (publication: JustTypename<AnyPublication>): DocumentNode => {
  switch (publication.__typename) {
    case 'Mirror':
      return FragmentMirror;
    case 'Post':
      return FragmentPost;
    case 'Comment':
      return FragmentComment;
    default:
      never("Can't infer fragment document");
  }
};

export class PublicationCacheManager {
  constructor(private cache: ApolloCache<NormalizedCacheObject>) {}

  write(publication: AnyPublication): void {
    this.cache.writeFragment<AnyPublication>({
      id: this.cache.identify({
        __typename: publication.__typename,
        id: publication.id,
      }),
      fragmentName: publication.__typename,
      fragment: resolveFragmentDoc(publication),
      data: publication,
    });
  }

  read(publicationId: PublicationId): Result<AnyPublication, FragmentNotFoundError> {
    const resolvedTypeResult = this.resolveExactPublicationType(publicationId);

    if (resolvedTypeResult.isFailure()) {
      return failure(resolvedTypeResult.error);
    }

    const { id, fragment, fragmentName } = resolvedTypeResult.unwrap();

    const publication = this.cache.readFragment<AnyPublication>({
      id,
      fragmentName,
      fragment,
    });

    // can't really happen as `resolveExactPublicationType` makes sure cache exists
    invariant(publication, 'Fragment not found');

    return success(publication);
  }

  update(
    publicationId: PublicationId,
    updateFn: (current: AnyPublication) => AnyPublication,
  ): Result<void, FragmentNotFoundError> {
    const resolvedTypeResult = this.resolveExactPublicationType(publicationId);

    if (resolvedTypeResult.isFailure()) {
      return failure(resolvedTypeResult.error);
    }

    const { id, fragment, fragmentName } = resolvedTypeResult.value;

    this.cache.updateFragment<AnyPublication>(
      {
        id,
        fragmentName,
        fragment,
      },
      (data) => {
        // can't really happen as `resolveExactPublicationType` makes sure cache exists
        invariant(data, 'Fragment not found');

        return updateFn(data);
      },
    );

    return success();
  }

  private resolveExactPublicationType(publicationId: PublicationId) {
    const postIdentifier =
      this.cache.identify({
        __typename: 'Post',
        id: publicationId,
      }) ?? never('Post identifier not found');
    const postArgs = {
      id: postIdentifier,
      fragmentName: 'Post',
      fragment: FragmentPost,
    };

    if (this.isInCache(postArgs)) {
      return success(postArgs);
    }

    const commentIdentifier =
      this.cache.identify({
        __typename: 'Comment',
        id: publicationId,
      }) ?? never('Comment identifier not found');
    const commentArgs = {
      id: commentIdentifier,
      fragmentName: 'Comment',
      fragment: FragmentComment,
    };

    if (this.isInCache(commentArgs)) {
      return success(commentArgs);
    }

    const mirrorIdentifier =
      this.cache.identify({
        __typename: 'Mirror',
        id: publicationId,
      }) ?? never('Mirror identifier not found');
    const mirrorArgs = {
      id: mirrorIdentifier,
      fragmentName: 'Mirror',
      fragment: FragmentMirror,
    };

    if (this.isInCache(mirrorArgs)) {
      return success(mirrorArgs);
    }

    return failure(new FragmentNotFoundError());
  }

  private isInCache(args: { id: string; fragmentName: string; fragment: DocumentNode }) {
    return !!this.cache.readFragment<AnyPublication>(args);
  }
}
