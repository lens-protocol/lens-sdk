import { LensClient } from '../LensClient';
import { getSdk, Sdk } from './graphql/proxy-action.generated';

export class LensProxyAction {
  private readonly sdk: Sdk;

  constructor(lensClient: LensClient, accessToken: string) {
    const gqlClient = lensClient.client;
    gqlClient.setHeader('authorization', `Bearer ${accessToken}`);

    this.sdk = getSdk(gqlClient);
  }

  async freeFollow(profileId: string) {
    const result = await this.sdk.ProxyAction({
      request: {
        follow: {
          freeFollow: {
            profileId,
          },
        },
      },
    });

    return result.data.result;
  }

  async freeCollect(publicationId: string) {
    const result = await this.sdk.ProxyAction({
      request: {
        collect: {
          freeCollect: {
            publicationId,
          },
        },
      },
    });

    return result.data.result;
  }

  async checkStatus(proxyActionId: string) {
    const result = await this.sdk.ProxyActionStatus({
      proxyActionId,
    });

    return result.data.result;
  }
}
