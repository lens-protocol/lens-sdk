import { Post, FragmentPost, activeProfileIdentifierVar } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  mockProfileFragment,
  mockSources,
  createGetPublicationMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockTransactionData,
  mockCreateMirrorRequest,
  mockPublicationId,
} from '@lens-protocol/domain/mocks';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { nonNullable } from '@lens-protocol/shared-kernel';

import { CreateMirrorResponder } from '../CreateMirrorResponder';

function setupTestScenario({
  post,
  transactionData,
}: {
  post: Post;
  transactionData: TransactionData<CreateMirrorRequest>;
}) {
  const activeProfile = mockProfileFragment();
  activeProfileIdentifierVar(activeProfile);

  const sources = mockSources();
  const apolloClient = createMockApolloClientWithMultipleResponses([
    createGetPublicationMockedResponse({
      variables: {
        request: {
          publicationId: transactionData.request.publicationId,
        },
        observerId: activeProfile.id,
        sources,
      },
      publication: { ...post, mirrors: post.mirrors.concat(mockPublicationId()) },
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify({
      __typename: 'Post',
      id: post.id,
    }),
    fragment: FragmentPost,
    fragmentName: 'Post',
    data: post,
  });

  const responder = new CreateMirrorResponder(apolloClient, sources);

  return {
    responder,

    get updatedPost() {
      return nonNullable(
        apolloClient.cache.readFragment<Post>({
          id: apolloClient.cache.identify({
            __typename: 'Post',
            id: post.id,
          }),
          fragment: FragmentPost,
          fragmentName: 'Post',
        }),
        "Can't find post in cache",
      );
    },
  };
}

describe(`Given an instance of the ${CreateMirrorResponder.name}`, () => {
  const author = mockProfileFragment();

  describe(`when "${CreateMirrorResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should update the original publication 'mirrors' list`, async () => {
      const post = mockPostFragment({
        profile: author,
      });

      const transactionData = mockTransactionData({
        request: mockCreateMirrorRequest({
          profileId: author.id,
          publicationId: post.id,
        }),
      });

      const scenario = setupTestScenario({
        post,
        transactionData,
      });

      await scenario.responder.commit(transactionData);

      expect(scenario.updatedPost.mirrors).toHaveLength(post.mirrors.length + 1);
    });
  });
});
