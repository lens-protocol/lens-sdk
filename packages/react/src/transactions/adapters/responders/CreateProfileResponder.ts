import {
  GetAllProfilesByOwnerAddressDocument,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import { CreateProfileRequest } from '@lens-protocol/domain/dist/use-cases/profile';
import { ITransactionResponder } from '@lens-protocol/domain/use-cases/transactions';

export class CreateProfileResponder implements ITransactionResponder<CreateProfileRequest> {
  constructor(private readonly client: LensApolloClient) {}

  async commit() {
    await this.client.refetchQueries({
      include: [GetAllProfilesByOwnerAddressDocument],
    });
  }
}
