import { ApolloCache, DocumentNode, NormalizedCacheObject } from '@apollo/client';
import {
  CommentFragmentDoc,
  JustTypename,
  MirrorFragmentDoc,
  PostFragmentDoc,
  PublicationFragment,
} from '@lens-protocol/api-bindings';
import { failure, invariant, never, Result, success } from '@lens-protocol/shared-kernel';

export class FragmentNotFoundError extends Error {
  name = 'FragmentNotFoundError' as const;
}

export const getFragmentDoc = (publication: JustTypename<PublicationFragment>): DocumentNode => {
  switch (publication.__typename) {
    case 'Mirror':
      return MirrorFragmentDoc;
    case 'Post':
      return PostFragmentDoc;
    case 'Comment':
      return CommentFragmentDoc;
    default:
      never("Can't infer fragment document");
  }
};

export class PublicationCacheManager {
  constructor(private cache: ApolloCache<NormalizedCacheObject>) {}

  write(publication: PublicationFragment): void {
    this.cache.writeFragment<PublicationFragment>({
      id: this.cache.identify({
        __typename: publication.__typename,
        id: publication.id,
      }),
      fragmentName: publication.__typename,
      fragment: getFragmentDoc(publication),
      data: publication,
    });
  }

  read(publicationId: string): Result<PublicationFragment, FragmentNotFoundError> {
    const resolvedTypeResult = this.resolveExactPublicationType(publicationId);

    if (resolvedTypeResult.isFailure()) {
      return failure(resolvedTypeResult.error);
    }

    const { id, fragment, fragmentName } = resolvedTypeResult.unwrap();

    const publication = this.cache.readFragment<PublicationFragment>({
      id,
      fragmentName,
      fragment,
    });

    // can't really happen as `resolveExactPublicationType` makes sure cache exists
    invariant(publication, 'Fragment not found');

    return success(publication);
  }

  update(
    publicationId: string,
    updateFn: (current: PublicationFragment) => PublicationFragment,
  ): Result<void, FragmentNotFoundError> {
    const resolvedTypeResult = this.resolveExactPublicationType(publicationId);

    if (resolvedTypeResult.isFailure()) {
      return failure(resolvedTypeResult.error);
    }

    const { id, fragment, fragmentName } = resolvedTypeResult.unwrap();

    this.cache.updateFragment<PublicationFragment>(
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

  private resolveExactPublicationType(publicationId: string) {
    const postIdentifier =
      this.cache.identify({
        __typename: 'Post',
        id: publicationId,
      }) ?? never('Post identifier not found');
    const postArgs = {
      id: postIdentifier,
      fragmentName: 'Post',
      fragment: PostFragmentDoc,
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
      fragment: CommentFragmentDoc,
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
      fragment: MirrorFragmentDoc,
    };

    if (this.isInCache(mirrorArgs)) {
      return success(mirrorArgs);
    }

    return failure(new FragmentNotFoundError());
  }

  private isInCache(args: { id: string; fragmentName: string; fragment: DocumentNode }) {
    return !!this.cache.readFragment<PublicationFragment>(args);
  }
}
