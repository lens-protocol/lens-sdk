import {
  HidePublicationDocument,
  HidePublicationMutation,
  HidePublicationMutationVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import {
  HidePublicationRequest,
  IHidePublicationGateway,
} from '@lens-protocol/domain/use-cases/publications';
import { assertError, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { UnspecifiedError } from '../../UnspecifiedError';

export class HidePublicationGateway implements IHidePublicationGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async hide(request: HidePublicationRequest): PromiseResult<void, never> {
    try {
      await this.apolloClient.mutate<HidePublicationMutation, HidePublicationMutationVariables>({
        mutation: HidePublicationDocument,
        variables: {
          publicationId: request.publicationId,
        },
      });

      return success();
    } catch (e) {
      assertError(e);

      throw new UnspecifiedError(e);
    }
  }
}
