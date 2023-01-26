import { LensClient } from '../LensClient';
import { BroadcastRequest } from '../graphql/types.generated';
import { getSdk, Sdk } from './graphql/transaction.generated';

export class LensTransaction {
  private readonly sdk: Sdk;

  constructor(lensClient: LensClient, accessToken: string) {
    const gqlClient = lensClient.client;
    gqlClient.setHeader('authorization', `Bearer ${accessToken}`);

    this.sdk = getSdk(gqlClient);
  }

  async broadcast(request: BroadcastRequest) {
    const result = await this.sdk.BroadcastProtocolCall({
      request,
    });

    return result.data.result;
  }
}
