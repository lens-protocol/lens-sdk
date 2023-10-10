import {
  AnyPublication,
  FragmentAnyPublication,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

export class PublicationCacheManager {
  constructor(private readonly client: SafeApolloClient) {}

  update(
    publicationId: PublicationId,
    updateFn: <TPublication extends AnyPublication>(current: TPublication) => TPublication,
  ) {
    const id = this.client.cache.identify({
      __typename: 'Publication',
      id: publicationId,
    });

    this.client.cache.updateFragment<AnyPublication>(
      {
        id,
        fragmentName: 'Publication',
        fragment: FragmentAnyPublication,
      },
      (data) => {
        if (data) {
          return updateFn(data);
        }
        return null;
      },
    );
  }
}
