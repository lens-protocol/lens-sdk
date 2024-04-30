import {
  OwnedHandlesDocument,
  ProfilesManagedDocument,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { AnyTransactionRequestModel } from '@lens-protocol/domain/entities';
import { ITransactionResponder } from '@lens-protocol/domain/use-cases/transactions';

export class CreateProfileResponder implements ITransactionResponder<AnyTransactionRequestModel> {
  constructor(private readonly apolloClient: SafeApolloClient) {}

  async commit() {
    await this.apolloClient.refetchQueries({
      include: [OwnedHandlesDocument, ProfilesManagedDocument],
    });
  }
}
