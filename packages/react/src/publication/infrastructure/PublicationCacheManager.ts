import {
  AnyPublication,
  PublicationData,
  PublicationDocument,
  PublicationVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import { IPublicationCacheManager } from '../adapters/IPublicationCacheManager';

export class PublicationCacheManager implements IPublicationCacheManager {
  constructor(private readonly client: SafeApolloClient) {}

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
}
