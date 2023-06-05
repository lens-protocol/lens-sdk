import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { AnyPublication, FragmentPublication } from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

export class PublicationCacheManager {
  constructor(private cache: ApolloCache<NormalizedCacheObject>) {}

  update(publicationId: PublicationId, updateFn: (current: AnyPublication) => AnyPublication) {
    const id = this.cache.identify({
      __typename: 'Publication',
      id: publicationId,
    });

    this.cache.updateFragment<AnyPublication>(
      {
        id,
        fragmentName: 'Publication',
        fragment: FragmentPublication,
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
